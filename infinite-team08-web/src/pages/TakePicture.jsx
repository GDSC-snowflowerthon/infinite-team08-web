import React from "react";
import GlobalStyle from "../styles/GlobalStyle";
import CameraComponent from "../components/CameraComponent";

function TakePicture(props) {
    return (
      <>
        <GlobalStyle />
        <CameraComponent />
      </>
    );
  }

  export default TakePicture;