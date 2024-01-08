import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/logo.svg"

function Home(props) {
  return <MainPageDiv>
    <Logo />
  </MainPageDiv>;
}

export default Home;

const MainPageDiv = styled.div`
  height: 100vh;
  max-width: 460px;
  margin: 20px auto;
  background-color: black;
`;
