import * as React from "react";

const BlueOne = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={21}
    fill="none"
    {...props}
  >
    <path fill="#009AFF" d="M0 0h21v21H0z" />
  </svg>
);

const GreenOne = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={21}
    fill="none"
    {...props}
  >
    <circle cx={10.5} cy={10.5} r={10.5} fill="#00FF6D" />
  </svg>
);

const WhiteOne = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={21}
    fill="none"
    {...props}
  >
    <circle cx={10.5} cy={10.5} r={10.5} fill="#fff" />
  </svg>
);

const YellowOne = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={21}
    fill="none"
    {...props}
  >
    <path fill="#FFFD00" d="m12.5 0 11.691 20.25H.81L12.5 0Z" />
  </svg>
);

export { BlueOne, GreenOne, WhiteOne, YellowOne };
