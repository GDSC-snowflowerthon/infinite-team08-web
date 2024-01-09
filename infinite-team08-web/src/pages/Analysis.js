import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import dummy_1 from "../assets/img/dummy_1.jpg";
import dummy_2 from "../assets/img/dummy_2.jpg";

function Analysis() {
  const movePage = useNavigate();

  const handleClick = () => {
    movePage('/');
  }

  return (
    <Main onClick={handleClick}>
        <Picture alt="dummy" src={dummy_1} />
        <Picture alt="dummy" src={dummy_2} />
        <p>처음으로 돌아가려면 화면을 클릭하세요</p>
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