import React from "react";
import GlobalStyle from "../styles/GlobalStyle";
import CameraComponent from "../components/CameraComponent";
import styled from "styled-components";

function TakePicture(props) {
  return (
    <>
      <GlobalStyle />
      <MainPageDiv>
        <CameraComponent />
        <FirstText>
          설명을 원하는 사진을 찍어주세요. <br />
          사진을 찍은 뒤, 자동으로 화면이 전환됩니다.
        </FirstText>
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
  justify-content: center;
  align-items: center;
`;

const FirstText = styled.div`
  color: white;
  font-size: x-large;
  font-weight: bold;
  text-align: center;
  margin: 20px;
  line-height: 3;
`;

export default TakePicture;
