import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CameraComponent from "./pages/CameraComponent";



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CameraComponent />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;