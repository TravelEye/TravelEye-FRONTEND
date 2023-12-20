import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import sample from "../assets/images/sample.png";
import Fixmypage from "../assets/images/Fixmypage.png";
import landmark_pin from "../assets/images/landmark_pin.png";
import LeftArrow from "../assets/images/LeftArrow.png";
import trashcan from "../assets/images/trashcan.png";
import {
  TitleBold,
  SubTitleMedium,
  BodyMedium15,
  BodyMedium12,
  BodyBold15,
  BodyBold12,
} from "./fonts.js";

const ViewTripContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
  padding-bottom: 60px;
`;
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: white;
  box-shadow: 0px 2px 5px 0px #00000040;
  color: black;
  height: 70px;
  text-align: center;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  font-family: KoPubWorldDotum;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: -0.5px;
  line-height: 30px;
  z-index: 2;
`;

const LeftArrowButton = styled.div`
  width: 25px;
  height: 25px;
  margin-left: 10px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const LeftArrowIcon = styled.img`
  width: 80%;
  height: 80%;
  border-radius: 50%;
`;

const TopHalf = styled.div`
  flex: 1;
  background-image: url(${sample});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 20px;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 60%;
  z-index: 1;
`;

const BottomHalf = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  position: absolute;
  background-color: white;
  top: 35%;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
`;

const Title = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 2%;
  width: 100%;
`;
const PlaceContainer = styled.div`
  margin-left: 10%;
  display: flex;
  margin-top: 10px;
  gap: 3%;
`;
const TrashcanIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
const LandmarkIcon = styled.img`
  width: 23px;
  height: 30px;
  cursor: pointer;
`;

const Greenball = styled.div`
  width: 15px;
  height: 15px;
  background-color: #50e293;
  border-radius: 50%;
`;
const PlaceTitle = styled.div`
  margin-top: 5%;
  display: flex;
  align-items: flex-end;
  gap: 5%;
`;
const PlaceContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20%;
`;
const trip1 = {
  tripname: "힐링제주여행",
  startDate: new Date("2024-03-13T00:01:01"),
  endDate: new Date("2024-03-18T00:01:01"),
};
const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10%;
  margin-top: 5%;
`;
const AddButton = styled.button`
  border-radius: 20px;
  height: 30px;
  background-color: white;
  color: #999999;
  border: 1px solid #999999;
  padding-left: 5%;
  padding-right: 5%;
`;
const PlaceComponent = ({ placeName, placeAddress, onRemove }) => {
  return (
    <PlaceContainer>
      <LandmarkIcon src={landmark_pin} />
      <PlaceContent>
        <BodyMedium15>{placeName}</BodyMedium15>
        <BodyMedium12>{placeAddress}</BodyMedium12>
      </PlaceContent>
      <TrashcanIcon src={trashcan} onClick={onRemove} />
    </PlaceContainer>
  );
};
const ViewTripPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedLandmark = location?.state?.selectedLandmark || "";

  const generateDays = (startDate, endDate) => {
    const days = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      days.push({
        day: days.length + 1,
        date: new Date(currentDate),
        places: [],
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };
  const [days, setDays] = useState(
    generateDays(trip1.startDate, trip1.endDate)
  );
  const [places, setPlaces] = useState([]);
  const handleAddPlace = (dayIndex) => {
    navigate("/search");
    console.log("Selected Landmark:", selectedLandmark);

    const newPlace = {
      name: selectedLandmark,
      address: "대전광역시 서구 둔산대로 169",
    };
    setDays((prevDays) => {
      const updatedDays = [...prevDays];
      updatedDays[dayIndex].places.push(newPlace);
      return updatedDays;
    });
  };
  const handleRemovePlace = (dayIndex, placeIndex) => {
    setDays((prevDays) => {
      const updatedDays = [...prevDays];
      updatedDays[dayIndex].places.splice(placeIndex, 1);
      return updatedDays;
    });
  };
  return (
    <ViewTripContainer>
      <HeaderContainer>
        <LeftArrowButton>
          <LeftArrowIcon src={LeftArrow} />
        </LeftArrowButton>
        내 여행
        <div style={{ marginRight: "40px" }} />
      </HeaderContainer>
      <TopHalf></TopHalf>
      <BottomHalf>
        <Title>
          <TitleBold>{trip1.tripname}</TitleBold>
          <BodyMedium12>
            {trip1.startDate.toLocaleDateString()} ~
            {trip1.endDate.toLocaleDateString()}
          </BodyMedium12>
        </Title>
        <BodyMedium12>여행의 묘미는 언제나!</BodyMedium12>
        {days.map((dayInfo, dayIndex) => (
          <div style={{ width: "100%" }} key={dayInfo.day}>
            <PlaceTitle>
              <Greenball />
              <BodyMedium15>Day {dayInfo.day}</BodyMedium15>
              <BodyMedium12>{dayInfo.date.toLocaleDateString()}</BodyMedium12>
            </PlaceTitle>
            {dayInfo.places.map((place, placeIndex) => (
              <PlaceComponent
                key={placeIndex}
                placeName={place.name}
                placeAddress={place.address}
                onRemove={() => handleRemovePlace(dayIndex, placeIndex)}
              />
            ))}
            <Buttons>
              <AddButton onClick={() => handleAddPlace(dayIndex)}>
                <BodyBold12>장소 추가하기</BodyBold12>
              </AddButton>
              <AddButton>
                <BodyBold12>메모 추가하기</BodyBold12>
              </AddButton>
            </Buttons>
          </div>
        ))}
      </BottomHalf>
    </ViewTripContainer>
  );
};

export default ViewTripPage;
