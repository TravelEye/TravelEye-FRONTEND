import React, { useState } from "react";
import MainPage from "./pages/Main";
import SurveyPage from "./pages/Survey/SurveyPage";
import "./App.css";
import MapPage from "./pages/Map/MapPage";
import { RecoilRoot } from "recoil";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

function Content() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route exact path="/map" element={<MapPage />} />
        <Route exact path="/survey" element={<SurveyPage />} />
      </Routes>
    </>
  );
}
function App() {
  return (
    <>
      <RecoilRoot>
        {/* <GlobalStyle /> */}
        <Router>
          <Content />
        </Router>
      </RecoilRoot>
    </>
  );
}
export default App;
