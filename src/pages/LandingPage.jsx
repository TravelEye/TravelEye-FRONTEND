import React from "react";
import styled from "styled-components";

import sample from "../assets/images/sample.png";
import AddPlan from "../assets/images/AddPlan.png";

const LandingContainer = styled.div`
  background-color: white;
  padding: 20px;
  z-index: 1;
`;

const RoundedRectangle = styled.div`
  width: 100%;
  background-color: #4caf50;
  box-shadow: 0px 6px 13px rgba(0, 0, 0, 0.39);
  color: white;
  text-align: center;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 10px;
  margin-bottom: 20px;
`;

const TripContainer = styled.div`
  background-image: url(${sample});
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 0px 6px 13px rgba(0, 0, 0, 0.39);
  width: 100%;
  height: 300px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const CityInfo = styled.div`
  background-color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  height: 10px;
  width: 75px;
  text-align: center;
  padding: 10px;
`;

const TripInfo = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  margin-top: auto;
`;
const AddPlanButton = styled.img`
  position: fixed;
  bottom: 100px;
  right: 30px;
  z-index: 2;
  cursor: pointer;
`;

const tripData = [
  {
    cityName: "도시 1",
    nickname: "여행 별명 1",
    description: "여행 설명 1",
  },
  {
    cityName: "도시 2",
    nickname: "여행 별명 2",
    description: "여행 설명 2",
  },
  {
    cityName: "도시 3",
    nickname: "여행 별명 3",
    description: "여행 설명 3",
  },

  {
    cityName: "도시 4",
    nickname: "여행 별명 4",
    description: "여행 설명 4",
  },

  {
    cityName: "도시 5",
    nickname: "여행 별명 5",
    description: "여행 설명 5",
  },
];

const LandingPage = () => {
  return (
    <LandingContainer>
      <RoundedRectangle>여행 관리</RoundedRectangle>
      {tripData.map((trip, index) => (
        <TripContainer key={index}>
          <CityInfo>
            <div>{trip.cityName}</div>
          </CityInfo>
          <TripInfo>
            <div>{trip.nickname}</div>
            <div>{trip.description}</div>
          </TripInfo>
        </TripContainer>
      ))}
      <AddPlanButton src={AddPlan} alt="Add Plan" />
    </LandingContainer>
  );
};

export default LandingPage;
