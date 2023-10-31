import React, { useState } from "react";
import MainPage from "./pages/MainPage";
import SurveyPage from "./pages/SurveyPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MapPage from "./pages/MapPage";

function App(props) {
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [bounds, setBounds] = useState(null);
  return (
    /*<SurveyPage />*/
    <MapPage
      setCoordinates={setCoordinates}
      setBounds={setBounds}
      coordinates={coordinates}
    />
  );
}

export default App;
