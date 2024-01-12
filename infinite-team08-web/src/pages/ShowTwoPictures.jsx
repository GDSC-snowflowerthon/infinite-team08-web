import React, { useContext } from "react";
import GlobalStyle from "../styles/GlobalStyle";
import styled from "styled-components";
import { ImageContext } from "../context/ImageContext";
import { useNavigate } from "react-router-dom";

function ShowTwoPictures(props) {
  const navigate = useNavigate();
  const { imageUrl } = useContext(ImageContext);

  const onClick = () => {
    navigate(`/`);
  };

  return (
    <>
      <GlobalStyle />
      <MainPageDiv onClick={onClick}>
        {imageUrl && (
          <>
            <ChangedImageContainer>
              <ChangedImage src={imageUrl} alt="Changed" />
              <GradientOverlay />
            </ChangedImageContainer>
            <CapturedImage src={imageUrl} alt="Captured" />
          </>
        )}

        <FirstText>처음으로 돌아가려면 화면을 클릭하세요.</FirstText>
      </MainPageDiv>
    </>
  );
}

const MainPageDiv = styled.div`
  height: 100vh;
  width: 90%;
  max-width: 460px;
  margin: 0 auto;
  background-color: #000; /* 흰 배경으로 변경 (확인용) */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative; /* position 속성 추가 */
`;

const ChangedImage = styled.img`
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
`;

const ChangedImageContainer = styled.div`
  width: 100%;
  height: auto;
  filter: blur(7px);
  position: relative;
  overflow: hidden;
  border-radius: 10px;
`;


const CapturedImage = styled.img`
  width: 100%;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at center,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.9) 60%
  );
`;

const FirstText = styled.div`
  color: white;
  font-size: x-large;
  font-weight: bold;
  text-align: center;
  margin: 20px;
  line-height: 3;
`;

export default ShowTwoPictures;
