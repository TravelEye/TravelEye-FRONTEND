import React, { useState } from "react";
import MainPage from "./pages/MainPage";
import SurveyPage from "./pages/SurveyPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import MapPage from "./pages/MapPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";

function App(props) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/main" element={<MainPage />} />{" "}
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
