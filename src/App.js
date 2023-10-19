import React, { useState } from "react";
import MainPage from "./pages/MainPage";
import SurveyPage from "./pages/SurveyPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MapPage from "./pages/MapPage";

function App(props) {
  return /*<SurveyPage />;*/ <MapPage />;
}

export default App;
