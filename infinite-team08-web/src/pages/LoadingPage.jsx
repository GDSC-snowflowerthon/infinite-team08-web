import React from "react";
import GlobalStyle from "../styles/GlobalStyle";
import { ReactComponent as Logo } from "../assets/logo.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function LoadingPage(props) {
  const navigate = useNavigate();

  const onClick = () => {
    const textToRead =
      "사진이 분석되었습니다. 처음으로 돌아가려면 화면을 클릭하세요.";
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.9; // 음성 속도 설정
    synth.speak(utterance); // 음성 재생

    navigate(`/showTwoPictures`);
  };

  return (
    <>
      <GlobalStyle />
      <MainPageDiv onClick={onClick}>
        <StyledLogo />
        <FirstText>
          사진을 분석하고 있습니다.
          <br />. . .
          <br />
          잠시만 기다려주세요.
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

const StyledLogo = styled(Logo)`
  width: 100%;
  margin-bottom: 40px;
`;

const FirstText = styled.div`
  color: white;
  font-size: x-large;
  font-weight: bold;
  text-align: center;
  margin: 20px;
  line-height: 3;
`;

export default LoadingPage;