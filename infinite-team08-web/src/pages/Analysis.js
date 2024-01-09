import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import dummy_1 from "../assets/img/dummy_1.jpg";
import dummy_2 from "../assets/img/dummy_2.jpg";



function Analysis() {
  const [fileContent, setFileContent] = useState('');
  const synthesis = window.speechSynthesis;
  
  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        const response = await fetch('../assets/text/dummy.txt');
        const content = await response.text();
        setFileContent(content);
      } catch (error) {
        console.error('Error fetching file:', error);
      }
    };

    fetchFileContent();
  }, []); // 빈 배열은 컴포넌트가 처음 마운트될 때만 실행되도록 합니다.

  const speakText = () => {
    const utterance = new SpeechSynthesisUtterance(fileContent);
    synthesis.speak(utterance);
  };

  const movePage = useNavigate();

  const handleClick = () => {
    movePage('/');
  }

  return (
    <Main /*onClick={handleClick}*/>
        <Picture alt="dummy" src={dummy_1} />
        <Picture alt="dummy" src={dummy_2} />
        <p>처음으로 돌아가려면 화면을 클릭하세요</p>
        <div>
        <button onClick={speakText}>Speak Text from File</button>
        </div>
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

const Picture = styled.img`
  width: 300px;
  height: 300px;
`

export default Analysis