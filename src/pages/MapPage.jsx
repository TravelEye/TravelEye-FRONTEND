import React, { useState } from "react";
import MapRestaurant from "./MapRestaurant";
import MapPartner from "./MapPartner";
import styled from "styled-components";

import Partner_active from "../assets/images/Partner_active.png";
import Partner_unactive from "../assets/images/Partner_unactive.png";
import Restaurant_active from "../assets/images/Restaurant_active.png";
import Restaurant_unactive from "../assets/images/Restaurant_unactive.png";
import { Button } from "@material-ui/core";

const adContainer = styled.div``;

const MapContainer = styled.div`
  padding: 20px 20px 20px 20px;
  background-color: rgb(41, 194, 156);
`;
const ButtonContainer = styled.div`
  flex-direction: column;
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
        <button onClick={handleRestaurantMode}>
          <img
            src={
              isRestaurantMode === true
                ? Restaurant_active
                : Restaurant_unactive
            }
          />
        </button>
        <button onClick={handlePartnerMode}>
          <img
            src={isPartnerMode === true ? Partner_active : Partner_unactive}
          />
        </button>
      </ButtonContainer>
      <adContainer>
        {isRestaurantMode ? <MapRestaurant /> : null}
        {isPartnerMode ? <MapPartner /> : null}
      </adContainer>
    </MapContainer>
  );
};

export default MapPage;
