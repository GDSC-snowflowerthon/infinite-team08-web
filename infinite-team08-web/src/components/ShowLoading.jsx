import React from "react";
import { BlueOne, GreenOne, WhiteOne, YellowOne } from "../assets/LoadingIcon";
import styled from "styled-components";

const SVGs = [GreenOne, YellowOne, BlueOne, WhiteOne];
const marginBetweenSVGs = 20;

const AnimatedContainer = styled.div`
  display: flex;
  animation: fadeInOut ${(SVGs.length * 0.5)}s linear infinite;

  @keyframes fadeInOut {
    0%, 100% {
      opacity: 0;
    }
    ${(SVGs.length - 1) * 20}%, ${(SVGs.length - 1) * 20 + 15}% {
      opacity: 1;
    }
  }
`;

function AnimatedSVGs() {
  return (
    <AnimatedContainer>
      {SVGs.map((SVG, index) => (
        <div key={index} style={{ marginRight: marginBetweenSVGs }}>
          <SVG />
        </div>
      ))}
    </AnimatedContainer>
  );
}

export default AnimatedSVGs;
