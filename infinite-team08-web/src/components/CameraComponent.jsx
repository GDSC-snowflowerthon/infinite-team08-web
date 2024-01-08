import React, { useRef, useCallback, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CameraComponent = () => {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null); // 찍은 사진을 저장할 상태

  const capture = useCallback(() => {
    const capturedImageSrc = webcamRef.current.getScreenshot();
    setImageSrc(capturedImageSrc); // 찍은 사진을 상태에 저장
  }, [webcamRef]);

  const reCapture = useCallback(() => {
    setImageSrc(null); // 이미지 상태 초기화하여 다시 촬영할 수 있도록 함
  }, []);

  useEffect(() => {
    let timer;
    if (imageSrc) {
      timer = setTimeout(() => {
        navigate('/loadingpage');
        const textToRead = "사진을 분석하고 있습니다.. . . 잠시만 기다려주세요.";
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = 0.9; // 음성 속도 설정
        synth.speak(utterance); // 음성 재생
      }, 10000); // 10초 뒤에 /loadingpage로 이동
    }

    return () => {
      clearTimeout(timer);
    };
  }, [imageSrc, navigate]);

  return (
    <CameraContainer>
      {imageSrc ? ( // imageSrc가 있을 때는 찍은 사진을 보여줌
        <CapturedImage src={imageSrc} alt="Captured" />
      ) : ( // imageSrc가 없을 때는 카메라 화면을 보여줌
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{ width: '100%' }}
        />
      )}
      {!imageSrc ? ( // 사진이 없을 때는 찍기 버튼 보여줌
        <CameraButton onClick={capture}>사진 찍기</CameraButton>
      ) : ( // 사진이 있을 때는 다시 찍기 버튼 보여줌
        <CameraButton onClick={reCapture}>사진 다시 찍기</CameraButton>
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
  width: 200px;
  height: 50px;
  font-size: 20px;
  border-radius: 20px;
  font-weight: bolder;
`;

const CapturedImage = styled.img`
  width: 100%;
`;

export default CameraComponent;
