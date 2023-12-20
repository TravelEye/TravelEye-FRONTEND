import React, { useState } from "react";
import MapRestaurant from "../MapRestaurant";
import MapPartner from "../MapPartner";
import styled from "styled-components";
import NavermyMap from "./NaverMap";
import NavermyMapRestaurant from "./NaverMapRestaurant";

import Partner_active from "../assets/images/Partner_active.png";
import Partner_unactive from "../assets/images/Partner_unactive.png";
import Restaurant_active from "../assets/images/Restaurant_active.png";
import Restaurant_unactive from "../assets/images/Restaurant_unactive.png";
import { Button } from "@material-ui/core";

const AdContainer = styled.div`
  position: relative;
  height: 100%;
`;

const MapContainer = styled.div`
  height: 93vh;
  position: relative;
  padding-bottom: 60px;
  background-color: white;
  overflow: hidden;
`;
const ButtonContainer = styled.div`
  position: absolute;
  top: 6%;
  right: 3%;
  display: flex;
  flex-direction: column;
  z-index: 2;
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
      <ButtonContainer>
        <img
          src={isPartnerMode === true ? Partner_active : Partner_unactive}
          onClick={handlePartnerMode}
          style={{ width: "60px", height: "60px" }}
        />
        <img
          src={
            isRestaurantMode === true ? Restaurant_active : Restaurant_unactive
          }
          onClick={handleRestaurantMode}
          style={{ width: "60px", height: "60px" }}
        />
      </ButtonContainer>
      <AdContainer>
        {isPartnerMode ? <NavermyMap /> : null}
        {isRestaurantMode ? <NavermyMapRestaurant /> : null}
      </AdContainer>
    </MapContainer>
  );
};

export default MapPage;
