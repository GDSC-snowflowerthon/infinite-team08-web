import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import main_logo from "../assets/img/main_logo.png"

function Loading() {
  const movePage = useNavigate();

  const handleClick = () => {
    movePage('/Analysis');
  }

  useEffect(() => {
    const timerId = setTimeout(() => {
      handleClick(); // Navigate to the next page after 10 seconds
    }, 10000);
    return () => clearTimeout(timerId);
  }, [handleClick]);

  return (
    <Main>
      <Logo alt="main_logo" src={main_logo} />
      
        <p>사진을 분석하고 있습니다.</p>
        <p>...</p>
        <p>잠시만 기다려주세요.</p>
      
    </Main>
  )
}

const Main = styled.div`
  max-width: 400px;
  height: 800px;
  width: 100%;
  margin: 0 auto;
  background-color:black;
  color:white;
  padding: 20px;
  text-align: center;
`

const Logo = styled.img`
  width: 300px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;
`

export default Loading;