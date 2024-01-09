import React, { useEffect, useState } from "react";
import GlobalStyle from "../styles/GlobalStyle";
import { ReactComponent as Logo } from "../assets/logo.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Home(props) {
  const navigate = useNavigate();
  const [doneSpeech, setDoneSpeech] = useState(false);

  const gotoTakePicture = () => {
    if (doneSpeech) {
      const textToRead = "설명을 원하는 사진을, 찍어주세요. 사진을 찍은 뒤, 자동으로 10초뒤 화면이 전환되어, 사진이 분석됩니다. 다시 사진을 찍고싶으시면, 다시 찍기 버튼을 눌러주세요.";
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.9; // 음성 속도 설정
      synth.speak(utterance); // 음성 재생
  
      navigate("/takePicture");
    }
  };
  

  const handleSpeech = () => {
    const textToRead =
      "시각장애인과, 비장애인이, 서로 바라보는 세상을, 이해하는 그날까지. 서로가 보는, 다른 세상을, 영원히 보여드립니다. 진행하려면, 화면을, 클릭하세요.";
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.9; // 음성 속도를 느리게 설정
    utterance.onend = () => {
      setDoneSpeech(true);
    };
    synth.speak(utterance);
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSpeech(); // 3초 뒤 음성 재생 시작
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []); // 처음 한 번만 실행하도록 빈 배열 전달

  return (
    <>
      <GlobalStyle />
      <MainPageDiv id="mainPageDiv" onClick={gotoTakePicture}>
        <StyledLogo />
        <FirstText>
          시각장애인과 비장애인이
          <br />
          서로 바라보는 세상을 이해하는 그날까지
          <br />
          서로가 보는 다른 세상을
          <br />
          영원히 보여드립니다
        </FirstText>
        <AttentionText>진행하려면 화면을 클릭하세요</AttentionText>
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

const AttentionText = styled.div`
  color: lightgrey;
  font-weight: bold;
  margin-top: 50px;
`;

export default Home;
