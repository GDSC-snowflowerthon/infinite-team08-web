import React, { useEffect, useState } from "react";
import GlobalStyle from "../styles/GlobalStyle";
import { ReactComponent as Logo } from "../assets/logo.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import test1 from "../assets/img/test1.png"
import test2 from "../assets/img/test2.png"
import test3 from "../assets/img/test3.png"
import test4 from "../assets/img/test4.png"


function Gallery () {
  //const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   axios({
  //     method: 'GET',
  //     url: 'https://jsonplaceholder.typicode.com/photos'
  //   }).then(response => setPosts(response.data))
  // })

  const synthesis = window.speechSynthesis;

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    synthesis.speak(utterance);
  };

  const handleSpeak = () => {
    speakText("가나다라");
  };

  return (
    <>
      <GlobalStyle />
      <MainPageDiv>
      <StyledLogo />
      {/* {posts.map(post => (
        <li key={post.id}>
          <div>{post.title}</div>
          <div><img src={post.thumbnailUrl} /></div>
        </li>
      ))} */}
      <Imagebox>
        <Image alt="test" src={test1} onClick={handleSpeak}/>
        <Image alt="test" src={test2} />
        <Image alt="test" src={test3} />
        <Image alt="test" src={test4} />
      </Imagebox>

      </MainPageDiv>
    </>

  )
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

const Imagebox =styled.div `
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`

const Image = styled.img `
  width: 100%;
`

const StyledLogo = styled(Logo)`
  width: 100%;
  margin-bottom: 20px;
`;

export default Gallery;