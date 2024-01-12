import React, { useEffect, useState } from "react";
import GlobalStyle from "../styles/GlobalStyle";
import { ReactComponent as Logo } from "../assets/logo.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [doneSpeech, setDoneSpeech] = useState(false);
  const [clickCount, setClickCount] = useState(0); // 클릭 횟수를 추적합니다.

  const handleSpeech = () => {
    const textToRead =
      "시각장애인과, 비장애인이, 서로 바라보는 세상을, 이해하는 그날까지. 서로가 보는, 다른 세상을, 영원히 이어드립니다. 진행하려면, 화면을, 클릭하세요.";
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.9; // 음성 속도를 느리게 설정
    utterance.onend = () => {
      setDoneSpeech(true);
    };
    synth.speak(utterance);
  };

  const handleClick = () => {
    if (!doneSpeech) {
      console.log("hi");
      handleSpeech(); // 음성 재생 시작
    } else {
      // 음성이 끝난 후의 동작
      setClickCount(clickCount + 1);
    }
  };

  useEffect(() => {
    if (clickCount > 0) {
      console.log(clickCount);
      const textToRead =
        "설명을 원하는 사진을, 찍어주세요. 사진을 찍은 뒤, 자동으로 10초뒤 화면이 전환되어, 사진이 분석됩니다. 다시 사진을 찍고싶으시면, 다시 찍기 버튼을 눌러주세요.";
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.9; // 음성 속도 설정
      synth.speak(utterance); // 음성 재생

      navigate("/takePicture");
      setClickCount(0);
    }
  }, [clickCount, navigate]);

  return (
    <>
      <GlobalStyle />
      <MainPageDiv id="mainPageDiv" onClick={handleClick}>
        <StyledLogo />
        <FirstText>
          시각장애인과 비장애인이
          <br />
          서로 바라보는 세상을 이해하는 그날까지
          <br />
        </FirstText>
        <SecondText>
          서로가 보는 다른 세상을
          <br />
          영원히 이어드립니다
        </SecondText>
        <AttentionText>
          <ChangedButton>진행하려면 화면을 클릭하세요 </ChangedButton>
        </AttentionText>
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
  margin-bottom: 20px;
`;

const FirstText = styled.div`
  color: lightgray;
  font-weight: bold;
  text-align: center;
  margin: 20px;
  line-height: 3;
  font-size: 22px;
  display: flex;
`;

const SecondText = styled.div`
  color: white;
  font-weight: bold;
  text-align: center;
  margin: 20px;
  line-height: 3;
  font-size: 24px;
  display: flex;
`;

const AttentionText = styled.div`
  background-color: #00ff6d;
  font-weight: bold;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; // 중요: 수직 가운데 정렬을 위해 추가
  border-radius: 30px;
  width: 327px;
  height: 50px;
`;

const ChangedButton = styled.div`
  color: black;
  text-align: center; // 중요: 수평 가운데 정렬을 위해 추가
  line-height: 41px; // 중요: 수직 가운데 정렬을 위해 추가 (높이와 같게 설정)
  font-size: larger;
  font-weight: bolder;
`;

export default Home;