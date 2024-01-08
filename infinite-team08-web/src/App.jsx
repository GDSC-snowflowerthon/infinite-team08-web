import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TakePicture from "./pages/TakePicture";
import LoadingPage from "./pages/LoadingPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/takePicture" element={<TakePicture />} />
          <Route path="/loadingPage" element={<LoadingPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;