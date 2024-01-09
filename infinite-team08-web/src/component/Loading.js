import "./Home.css"
import { useNavigate } from "react-router-dom";

export default function Loading() {
  const movePage = useNavigate();

  const handleClick = () => {
    movePage('/Analysis');
  }

  return (
    <div className="Home">
      <img className="main_logo" alt="main_logo" src="img/main_logo.png" />
      <div className="Main">
        <p>사진을 분석하고 있습니다.</p>
        <p>...</p>
        <p>잠시만 기다려주세요.</p>
        <p onClick={handleClick}>aaaa</p>
      </div>
    </div>
  )
}