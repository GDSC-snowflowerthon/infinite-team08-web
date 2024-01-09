import React from "react";
import Home from "./pages/Home";
import Take_Picture from "./pages/Take_Picture";
import Loading from "./pages/Loading";
import Analysis from "./pages/Analysis";
import { BrowserRouter as Router, Route, Routes, BrowserRouter, Link } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Take_Picture" element={<Take_Picture />} />
        <Route path="/Loading" element={<Loading />} />
        <Route path="/Analysis" element={<Analysis />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;