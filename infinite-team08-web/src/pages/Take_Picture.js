import { useCallback, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Webcam from "react-webcam";

function Take_Picture() {
  const movePage = useNavigate();

  const handleClick = () => {
    movePage('/Loading');
  }
    
  const webcamRef = useRef(null);
  const [imageSrc, setCapturedImage] = useState(null);

  const capture = useCallback(() => {
    const capturedImageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(capturedImageSrc);
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      handleClick(); // Navigate to the next page after 10 seconds
    }, 10000);
    return () => clearTimeout(timerId);
  }, [handleClick]);

  return (
    <Main>
      {imageSrc ? (
        <CapturedImage src={imageSrc} alt="Captured" />
      ):(
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{width: "100%"}}
      />
      )}
      <br />
        <p>설명을 원하는 사진을 찍어주세요.</p>
        <p>사진을 찍은 뒤, 자동으로 화면이 전환됩니다.</p>
        <Capture_button onClick={capture}></Capture_button>
    </Main>
  )
}

const Main = styled.main`
  max-width: 400px;
  height: 800px;
  width: 100%;
  margin: 0 auto;
  background-color:black;
  color:white;
  padding: 20px;
  text-align: center;
`

const CapturedImage = styled.img`
  width: 100%;
`

const Capture_button = styled.button`
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
`

export default Take_Picture;