import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import main_logo from "../assets/img/main_logo.png"

function Home() {
  const movePage = useNavigate();

  const handleClick = () => {
    movePage('/Take_Picture');
  }

  return (
    <Main onClick={handleClick}>
      <Logo alt="main_logo" src={main_logo} />
        <p>시각장애인과 비장애인이</p>
        <p>서로 바라보는 세상을 이해하는 그날까지</p>
        <p>서로가 보는 다른 세상을</p>
        <p>열심히 보여드립니다</p>
        <br/><br/>
        <p>진행하려면 화면을 클릭하세요</p>
      {/* <Buttom>
        <p onClick={handleClick}>진행하려면 화면을 클릭하세요</p>
      </Buttom> */}
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

export default Home;