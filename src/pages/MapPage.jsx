import React from "react";
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
  return (
    <MapContainer>
      <p>Trip Partner 찾기 </p>
      <p>switch button 자리</p>
      <adContainer>
        <Map />
      </adContainer>
    </MapContainer>
  );
};

export default MapPage;
