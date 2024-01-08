import React from "react";
import GlobalStyle from "../styles/GlobalStyle";
import { ReactComponent as Logo } from "../assets/logo.svg";
import styled from "styled-components";

function Home(props) {
  return (
    <>
      <GlobalStyle />
      <MainPageDiv>
        <StyledLogo />
        <FirstText>
          시각장애인과 비장애인이<br />서로 바라보는 세상을 이해하는 그날까지<br />서로가 보는 다른 세상을<br />영원히 보여드립니다
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
