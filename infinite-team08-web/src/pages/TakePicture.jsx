import React from "react";
import GlobalStyle from "../styles/GlobalStyle";
import CameraComponent from "../components/CameraComponent";
import styled from "styled-components";
import { ReactComponent as SmallLogo } from "../assets/smalllogo.svg";

function TakePicture(props) {
  return (
    <>
      <GlobalStyle />
      <MainPageDiv>
        <StyledSmallLogo />
        <FirstText>
          사진을 찍은 뒤, 10초 후에
          <br />
          자동으로 화면이 전환됩니다
        </FirstText>
        <CameraComponent />

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

const StyledSmallLogo = styled(SmallLogo)`
  height: 48px;

  margin-bottom: 20px;
`;

const FirstText = styled.div`
  color: lightgray;
  font-size: large;
  font-weight: bold;
  text-align: center;
  margin: 20px;
  line-height: 2;
`;



export default TakePicture;