import "./Take_Picture.css"
import { useCallback, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";

export default function Take_Picture() {
  //  const movePage = useNavigate();
  const movePage = useNavigate();

  const handleClick = () => {
    movePage('/Loading');
  }
    
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const videoConstraints = {
    width: 300,
    height: 300,
    facingMode: 'user', // 또는 'environment' 등
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  }, []);

  return (
    <div className="Home">
      <Webcam
      audio={false}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      videoConstraints={videoConstraints}
    />
    <br />
    <button onClick={capture}>Capture photo</button>
    <br />
    {capturedImage && (
      <div>
        <p>설명을 원하는 사진을 찍어주세요.</p>
        <p>사진을 찍은 뒤, 자동으로 화면이 전환됩니다.</p>
        <p onClick={handleClick}>aaaa</p>
        <img
          src={capturedImage}
          alt="captured"
          style={{  width: '300px', height: 'auto' }}
        />
      </div>
    )}
    </div>
  )
}