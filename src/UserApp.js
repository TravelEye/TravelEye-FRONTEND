import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import MapPage from "./pages/MapPage";
import BottomNav from "./pages/BottomNav";
import Mypage from "./pages/Mypage";
import LandingPage from "./pages/LandingPage";
import NewTrip from "./pages/NewTrip";
import MakeTripPage from "./pages/MakeTripPage";
const User = () => {
  return (
    <Router>
      <BottomNav />
      <Routes>
        <Route path="/map" element={<MapPage />} />
        <Route path="/landing" element={<LandingPage />} />{" "}
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/newtrip" element={<NewTrip />} />
        <Route path="/maketrip" element={<MakeTripPage />} />
        <Route path="/newtrip" element={<NewTrip />} />
      </Routes>
    </Router>
  );
};

export default User;
