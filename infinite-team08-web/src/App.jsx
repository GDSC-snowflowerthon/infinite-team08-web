import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TakePicture from "./pages/TakePicture";
import LoadingPage from "./pages/LoadingPage";
import { ImageContext } from "./context/ImageContext";
import ShowTwoPictures from "./pages/ShowTwoPictures";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [translatedDescription, setTransalteDescription] = useState("");

  return (
    <>
      <ImageContext.Provider value={{ imageUrl, setImageUrl, description, setDescription, translatedDescription, setTransalteDescription }}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/takePicture" element={<TakePicture />} />
            <Route path="/loadingPage" element={<LoadingPage />} />
            <Route path="/showTwoPictures" element={<ShowTwoPictures />} />
          </Routes>
        </Router>
      </ImageContext.Provider>
    </>
  );
}

export default App;
