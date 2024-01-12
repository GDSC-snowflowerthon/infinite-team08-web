import React, { useEffect, useContext } from "react";
import GlobalStyle from "../styles/GlobalStyle";
import { ReactComponent as SmallLogo } from "../assets/smalllogo.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ImageContext } from "../context/ImageContext";
import axios from "axios";
import AnimatedSVGs from "../components/ShowLoading";

function LoadingPage(props) {
  const navigate = useNavigate();

  const {
    description,
    setDescription,
    translatedDescription,
    setTransalteDescription,
  } = useContext(ImageContext);

  useEffect(() => {
    // 이미지를 text로 바꿔주는 API
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
        console.log("image_to_text 요청 성공:", response.data);
        setDescription(response.data);
      } catch (error) {
        console.error(error);
        console.error("image_to_text 요청 실패:", error);
      }
    };
  
    // description이 없을 때만 fetchData 실행
    if (!description) {
      fetchData();
    }
  }, [description]); // description이 변경될 때만 실행
  
  // 영어 한글로 번역하는 부분
  useEffect(() => {
    // description이 있고, translatedDescription이 없을 때만 translateRequest 실행
    const translateRequest = async () => {
      try {
        const encodedDescription = encodeURIComponent(description);
        const response = await axios.get(
          `https://www.seunghan.shop/translate?prompt=${encodedDescription}`
        );
        console.log("Translation 요청 성공:", response.data);
        setTransalteDescription(response.data.translated_text);
      } catch (error) {
        console.error("Translation 요청 실패:", error);
      }
    };
  
    if (description && !translatedDescription) {
      translateRequest();
    }
  }, [description, translatedDescription]); // description 또는 translatedDescription이 변경될 때 실행
  

  useEffect(() => {
    if (translatedDescription) {
      navigate(`/showTwoPictures`);
      const textToRead = "사진이 분석되었습니다. 설명은 다음과 같습니다.";
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      const descriptionUtterance = new SpeechSynthesisUtterance(
        translatedDescription
      );
      utterance.rate = 0.9; // 음성 속도 설정
      synth.speak(utterance); // 음성 재생
      synth.speak(descriptionUtterance); // 음성 재생
    }
  }, [translatedDescription, navigate]);

  return (
    <>
      <GlobalStyle />
      <MainPageDiv>
        <StyledSmallLogo />
        <FirstText>사진을 분석하고 있습니다.</FirstText>
        <AnimatedSVGs />
        <FirstText>잠시만 기다려주세요.</FirstText>
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
  width: 100%;
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
