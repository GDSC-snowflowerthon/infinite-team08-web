import "./Home.css"
import { useNavigate } from "react-router-dom";

export default function Analysis() {
  const movePage = useNavigate();

  const handleClick = () => {
    movePage('/');
  }

  return (
    <div className="Home">
      <div className="Main">
        <img className="dummy" alt="dummy" src="img/dummy_1.jpg" />
        <img className="dummy" alt="dummy" src="img/dummy_2.jpg" />
        <p onClick={handleClick}>처음으로 돌아가려면 화면을 클릭하세요</p>
      </div>
    </div>
  )
}