import React, { useEffect, useState } from "react";
import { ReactComponent as Green } from "../assets/green.svg";
import { ReactComponent as Yellow } from "../assets/yellow.svg";
import { ReactComponent as Blue } from "../assets/blue.svg";
import { ReactComponent as White } from "../assets/white.svg";

const SVGs = [Green, Yellow, Blue, White];
const marginBetweenSVGs = 20; // 간격을 조절할 값

function AnimatedSVGs() {
  const [showSVGs, setShowSVGs] = useState([]);

  useEffect(() => {
    const timeoutArray = [];

    // SVGs 나타내기
    SVGs.forEach((SVG, index) => {
      const timeout = setTimeout(() => {
        setShowSVGs((prev) => [...prev, SVG]);
      }, index * 500); // 0.5초 간격으로 나타남
      timeoutArray.push(timeout);
    });

    // SVGs 사라지기
    const reverseTimeout = setTimeout(() => {
      setShowSVGs([]);
      SVGs.forEach((_, index) => {
        const timeout = setTimeout(() => {
          setShowSVGs((prev) => [...prev, null]);
        }, (SVGs.length - index - 1) * 500); // 0.5초 간격으로 사라짐
        timeoutArray.push(timeout);
      });
    }, SVGs.length * 500);

    // Timeout 클리어
    return () => {
      timeoutArray.forEach((timeout) => clearTimeout(timeout));
      clearTimeout(reverseTimeout);
    };
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {showSVGs.map((SVG, index) => {
        const SVGComponent = SVGs[index];
        return (
          <div
            key={index}
            style={{
              marginRight: index < SVGs.length - 1 ? marginBetweenSVGs : 0,
            }}
          >
            {SVG ? <SVGComponent /> : null}
          </div>
        );
      })}
    </div>
  );
}

export default AnimatedSVGs;
