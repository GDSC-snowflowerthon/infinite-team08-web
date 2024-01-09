import React, { useContext } from "react";
import GlobalStyle from "../styles/GlobalStyle";
import styled from "styled-components";
import { ImageContext } from "../context/ImageContext";
import { useNavigate } from "react-router-dom";

function ShowTwoPictures(props) {
  const navigate = useNavigate();
  const { imageUrl, changedImg } = useContext(ImageContext);

  const onClick = () => {
    navigate(`/`);
  };

  return (
    <>
      <GlobalStyle />
      <MainPageDiv onClick={onClick}>
        {imageUrl && <CapturedImage src={changedImg} alt="Changed" />}
        {imageUrl && <CapturedImage src={imageUrl} alt="Captured" />}

        <FirstText>처음으로 돌아가려면 화면을 클릭하세요.</FirstText>
      </MainPageDiv>
    </>
  );
}

const MainPageDiv = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const CapturedImage = styled.img`
  width: 90%;
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
