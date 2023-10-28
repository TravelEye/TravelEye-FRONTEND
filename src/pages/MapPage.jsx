import React, { useState } from "react";
import Map from "./Map";
import styled from "styled-components";

const adContainer = styled.div`
  margin: 20%;
`;
const MapContainer = styled.div`
  padding: 20px 20px 20px 20px;
  background-color: rgb(41, 194, 156);
`;

const MapPage = () => {
  const [isRestaurantMode, setRestaurantMode] = useState(true);
  const [isPartnerMode, setPartnerMode] = useState(false);

  const handleRestaurantMode = () => {
    setRestaurantMode(true);
    setPartnerMode(false);
  };

  const handlePartnerMode = () => {
    setRestaurantMode(false);
    setPartnerMode(true);
  };

  return (
    <MapContainer>
      <button
        onClick={handleRestaurantMode}
        style={{ color: isRestaurantMode ? "white" : "gray" }}
      >
        음식점 모드
      </button>
      <button
        onClick={handlePartnerMode}
        style={{ color: isPartnerMode ? "white" : "gray" }}
      >
        동행 모드
      </button>
      <adContainer>
        <Map />
      </adContainer>
    </MapContainer>
  );
};

export default MapPage;
