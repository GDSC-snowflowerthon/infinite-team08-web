import React, { useContext } from "react";
import GlobalStyle from "../styles/GlobalStyle";
import styled from "styled-components";
import { ImageContext } from "../context/ImageContext";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SmallLogo } from "../assets/smalllogo.svg";


function ShowTwoPictures(props) {
  const navigate = useNavigate();

  const { imageUrl, setTransalteDescription, setImageUrl, setDescription } = useContext(ImageContext);

  const onClick = () => {
    navigate(`/`);
    setDescription('');
    setTransalteDescription('');
    setImageUrl('');
  };

  return (
    <>
      <GlobalStyle />
      <MainPageDiv onClick={onClick}>
      <StyledSmallLogo />
        {imageUrl && (
          <>
            <ChangedImageContainer>
              <ChangedImage src={imageUrl} alt="Changed" />
              <GradientOverlay />
            </ChangedImageContainer>
            <CapturedImage src={imageUrl} alt="Captured" />
          </>
        )}

        <AttentionText>
          <ChangedButton>처음으로 돌아가려면<br/>화면을 클릭하세요</ChangedButton>
        </AttentionText>
      </MainPageDiv>
    </>
  );
}

const MainPageDiv = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
  background-color: #000; /* 흰 배경으로 변경 (확인용) */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative; /* position 속성 추가 */
`;

const ChangedImage = styled.img`
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
`;

const ChangedImageContainer = styled.div`
  width: 100%;
  height: auto;
  filter: blur(7px);
  position: relative;
  overflow: hidden;
  border-radius: 10px;
`;

const CapturedImage = styled.img`
  width: 100%;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at center,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.9) 60%
  );
`;

const AttentionText = styled.div`
  background-color: #00ff6d;
  font-weight: 500;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; // 중요: 수직 가운데 정렬을 위해 추가
  border-radius: 30px;
  width: 327px;
  height: 70px;
`;

const ChangedButton = styled.div`
  color: black;
  text-align: center; // 중요: 수평 가운데 정렬을 위해 추가
  line-height: 41px; // 중요: 수직 가운데 정렬을 위해 추가 (높이와 같게 설정)
  font-size: larger;
  font-weight: bolder;
`;

const StyledSmallLogo = styled(SmallLogo)`
  width: 20%;
  
`;

export default ShowTwoPictures;