import "./Home.css"
import { useNavigate } from "react-router-dom";

export default function Home() {
  const movePage = useNavigate();

  const handleClick = () => {
    movePage('/Take_Picture');
  }

  return (
    <div className="Home">
      <img className="main_logo" alt="main_logo" src="img/main_logo.png" />
      <div className="Main">
        시각장애인과 비장애인이<br/><br/>
        서로 바라보는 세상을 이해하는 그날까지<br/><br/><br/>
        서로가 보는 다른 세상을<br/><br/>
        열심히 보여드립니다<br/>
        <p onClick={handleClick}>aaaa</p>
      </div>
      <div className="Bottom">
        진행하려면 화면을 클릭하세요
      </div>
    </div>
  )
}