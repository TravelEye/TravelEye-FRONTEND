import React, { useState } from "react";
import MainPage from "./pages/MainPage";
import SurveyPage from "./pages/SurveyPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import MapPage from "./pages/MapPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import BottomNav from "./pages/BottomNav";
import Mypage from "./pages/Mypage";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/Profile";
import SplashPage from "./pages/StartPage";
import NewTrip from "./pages/NewTrip";
function App(props) {
  return (
    <Router>
      <BottomNav />
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/landing" element={<LandingPage />} />{" "}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/profile" element={<ProfilePage />} />\
        <Route path="/newtrip" element={<NewTrip />} />
      </Routes>
    </Router>
  );
}

export default App;
