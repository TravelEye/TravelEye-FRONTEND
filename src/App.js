import React, { useState } from "react";
import MainPage from "./pages/Main";
import CheckListPage from "./pages/CheckList";
import SurveyPage from "./pages/Survey/SurveyPage";
import MapPage from "./pages/Map/Map";
import "./App.css";
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
        <Route exact path="/checklist" element={<CheckListPage />} />
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
