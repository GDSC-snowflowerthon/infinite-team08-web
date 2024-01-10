import React, { useEffect, useContext } from "react";
import GlobalStyle from "../styles/GlobalStyle";
import { ReactComponent as Logo } from "../assets/logo.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ImageContext } from "../context/ImageContext";
import axios from "axios";

function LoadingPage(props) {
  const navigate = useNavigate();

  const { description, setDescription, changedImg, setChangedImg } =
    useContext(ImageContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://www.seunghan.shop/image_to_text",
          "data.jpg",
          {
            headers: {
              "Content-Type": "text/plain",
            },
          }
        );
        setDescription(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const sendGetRequest = async () => {
      try {
        const encodedDescription = encodeURIComponent(description);
        const response = await axios.get(
          `https://www.seunghan.shop/generate?prompt=${encodedDescription}`
        );
        console.log("GET 요청 성공:", response.data);
        setChangedImg(response.data.image_url);
      } catch (error) {
        console.error("GET 요청 실패:", error);
      }
    };

    if (description) {
      sendGetRequest();
    }
  }, [description]);

  useEffect(() => {
    if (changedImg) {
      const textToRead =
        "사진이 분석되었습니다. 설명은 다음과 같습니다.";
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      const descriptionUtterance = new SpeechSynthesisUtterance(description);
      utterance.rate = 0.9; // 음성 속도 설정
      synth.speak(utterance); // 음성 재생
      synth.speak(descriptionUtterance); // 음성 재생
      navigate(`/showTwoPictures`);
    }
  }, [changedImg, navigate]);

  return (
    <>
      <GlobalStyle />
      <MainPageDiv>
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
