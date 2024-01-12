import React, {
  useRef,
  useCallback,
  useState,
  useEffect,
  useContext,
} from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ImageContext } from "../context/ImageContext";
import axios from "axios";

const CameraComponent = () => {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const { imageUrl, setImageUrl } = useContext(ImageContext);

  // 모바일 여부 확인 함수
  const isMobile = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  // 초기 facingMode 결정 함수
  const getInitialFacingMode = useCallback(() => {
    if (isMobile()) {
      // 모바일일 경우
      return "environment"; // 후면 카메라
    } else {
      // 웹일 경우
      return "user"; // 전면 카메라
    }
  }, []);

  useEffect(() => {
    if (!webcamRef.current) {
      const initialFacingMode = getInitialFacingMode();
      const isUserFacing = initialFacingMode === 'user';
      
      const videoConstraints = {
        facingMode: isMobile() ? "environment" : initialFacingMode, // 모바일인 경우 후면 카메라, 웹인 경우 초기 facingMode
        width: isUserFacing ? 640 : 640,
        height: isUserFacing ? 480 : 480,
        aspectRatio: 4 / 3,
      };
    
      webcamRef.current = new Webcam({
        videoConstraints,
      });
    }
  }, [getInitialFacingMode]);
  
  
  

  const capture = useCallback(async () => {
    const capturedImageSrc = webcamRef.current.getScreenshot();
    setImageSrc(capturedImageSrc); // 찍은 사진을 상태에 저장
    setImageUrl(capturedImageSrc); // 이미지를 ImageContext에 저장
  }, [setImageUrl]);

  const reCapture = useCallback(() => {
    setImageSrc(null); // 이미지 상태 초기화하여 다시 촬영할 수 있도록 함
    setImageUrl(null); // 이미지 URL을 null로 설정하여 업데이트
  }, [setImageUrl]);

  const uploadImage = async () => {
    try {
      const base64Prefix = "data:image/jpeg;base64,";
      const base64Image = imageUrl.startsWith(base64Prefix)
        ? imageUrl.slice(base64Prefix.length) // "data:image/jpeg;base64," 부분 제거
        : imageUrl;

      const byteCharacters = atob(base64Image);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/jpeg" });
      const file = new File([blob], "image.jpg", { type: "image/jpeg" });

      const response = await axios.get(
        "https://www.seunghan.shop/presigned-url/upload?filename=data.jpg"
      );

      console.log(response.data);

      const presignedUrl = response.data; // presigned URL 얻기

      // presigned URL로 PUT 요청하여 이미지 업로드
      const imageResponse = await fetch(presignedUrl, {
        method: "PUT",
        body: file, // 이미지 파일 직접 전달
        headers: {
          "Content-Type": "image/jpeg",
        },
      });

      console.log("이미지 업로드 성공:", imageResponse);
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    }
  };

  useEffect(() => {
    let timer;
    if (imageSrc) {
      timer = setTimeout(async () => {
        await uploadImage();
        navigate("/loadingpage");
        const textToRead =
          "사진을 분석하고 있습니다.. . . 잠시만 기다려주세요.";
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = 0.9; // 음성 속도 설정
        synth.speak(utterance); // 음성 재생
      }, 10000); // 10초 뒤에 /loadingpage로 이동

      console.log(imageUrl);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [imageSrc, navigate]);

  return (
    <CameraContainer>
      {imageSrc ? (
        <CapturedImage src={imageSrc} alt="Captured" />
      ) : (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{ width: "100%" }}
        />
      )}
      {!imageSrc ? (
        <CameraButton onClick={capture}>촬영</CameraButton>
      ) : (
        <ReCameraButton onClick={reCapture}>
          다시
          <br />
          찍기
        </ReCameraButton>
      )}
    </CameraContainer>
  );
};

const CameraContainer = styled.div`
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
`;

const CameraButton = styled.button`
  display: block;
  margin: 10px auto;
  width: 150px;
  height: 150px;
  font-size: 25px;
  border-radius: 50%;
  font-weight: 700;
  background-color: #00ff6d;
  margin-top: 60px;
  color: black;
`;

const ReCameraButton = styled.button`
  display: block;
  margin: 10px auto;
  width: 150px;
  height: 150px;
  font-size: 25px;
  border-radius: 50%;
  font-weight: 700;
  background-color: black;
  margin-top: 60px;
`;

const CapturedImage = styled.img`
  width: 100%;
`;

export default CameraComponent;
