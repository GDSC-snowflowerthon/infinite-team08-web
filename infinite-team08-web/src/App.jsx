import React from "react";
import Home from "./component/Home";
import Take_Picture from "./component/Take_Picture";
import Loading from "./component/Loading";
import Analysis from "./component/Analysis";
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