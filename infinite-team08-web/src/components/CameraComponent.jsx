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
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const { imageUrl, setImageUrl } = useContext(ImageContext);

  const toggleCamera = useCallback(() => {
    setIsFrontCamera((prevIsFrontCamera) => !prevIsFrontCamera);
  }, []);

  const isMobile = () => {
    return window.innerWidth <= 600;
  };

  const getInitialFacingMode = useCallback(() => {
    if (isMobile()) {
      return isFrontCamera ? "user" : "environment"; // 수정된 부분
    } else {
      return "user";
    }
  }, [isFrontCamera]);

  useEffect(() => {
    if (!webcamRef.current) {
      const initialFacingMode = getInitialFacingMode();
      const isUserFacing = initialFacingMode === "user";

      const videoConstraints = {
        facingMode: { exact: "environment" },
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
    setImageSrc(capturedImageSrc);
    setImageUrl(capturedImageSrc);
  }, [setImageUrl]);

  const reCapture = useCallback(() => {
    setImageSrc(null);
    setImageUrl(null);
  }, [setImageUrl]);

  const uploadImage = async () => {
    try {
      const base64Prefix = "data:image/jpeg;base64,";
      const base64Image = imageUrl.startsWith(base64Prefix)
        ? imageUrl.slice(base64Prefix.length)
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

      const presignedUrl = response.data;

      const imageResponse = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
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
        utterance.rate = 0.9;
        synth.speak(utterance);
      }, 10000);

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
        <>
          <CameraWrapper>
            <CameraButton onClick={capture}>촬영</CameraButton>
            {isMobile() ? (
              <CameraButton onClick={toggleCamera}>
                {isFrontCamera ? "전면" : "후면"} 전환
              </CameraButton>
            ) : (
              ""
            )}
          </CameraWrapper>
        </>
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
  line-height: 1.5;
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

const CameraWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

export default CameraComponent;
