import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

const CameraComponent = () => {
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    // 이미지를 찍은 후, 이후에 원하는 동작을 수행할 수 있습니다.
    console.log(imageSrc); // 여기에서 이미지 데이터를 처리하거나 전송하는 등의 동작을 수행할 수 있습니다.
  }, [webcamRef]);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Capture photo</button>
    </div>
  );
};

export default CameraComponent;
