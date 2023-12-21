import React, { useState, useEffect } from "react";
import styled from "styled-components";
import sample from "../assets/images/sample.png";
import AddPlan from "../assets/images/AddPlan.png";
import { useNavigate } from "react-router-dom";
import {
  TitleBold,
  SubTitleMedium,
  BodyMedium15,
  BodyMedium12,
  BodyBold15,
  BodyBold12,
} from "./fonts.js";
import axios from "axios";
const LandingContainer = styled.div`
  background-color: white;
  z-index: 1;
  position: relative;
  padding-bottom: 60px;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
`;

const TripContainer = styled.div`
  background-image: url(${sample});
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 0px 0px 7px 0px #00000080;
  height: 250px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const CityInfo = styled.div`
  background-color: white;
  border-radius: 20px;
  text-align: center;
  width: 12%;
  height: 4%;
  margin-top: 5%;
  margin-left: 4%;
  box-shadow: 0px 0px 3px 0px #00000080;
  padding: 10px;
`;

const TripInfo = styled.div`
  background-color: white;
  height: 40%;
  border-radius: 10px;
  padding: 20px;
  margin-top: auto;
  display: flex;
  flex-direction: column;
`;
const AddPlanButton = styled.img`
  position: fixed;
  bottom: 100px;
  right: 30px;
  z-index: 2;
  cursor: pointer;
`;

const PartnerStateContainer = styled.div`
  border: 1px solid #50e293;
  background-color: transparent;
  text-align: center;
  border-radius: 20px;
  color: #50e293;
  width: 20%;
`;
const TripStateContainer = styled.div`
  border: 1px solid #999999;
  background-color: transparent;
  text-align: center;
  border-radius: 20px;
  color: #999999;
  width: 20%;
`;

const TripExpanationContainer = styled.div`
  margin-top: 10px;
  text-align: left;
`;

const StateContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 15px;
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
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  const handleMakeTripButtonClick = () => {
    navigate("/maketrip");
  };
  const [trips, setTrips] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:80/trip/all", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setTrips(response.data.data);
        console.log(response.data.data);
        console.log(trips);
      } catch (error) {
        console.error("Error fetching trip data:", error);
      }
    };

    fetchData();
  }, []);
  const handleTripClick = (index) => {
    navigate("/viewTrip", { state: { tripData: trips[index] } });
  };

  return (
    <LandingContainer>
      <HeaderContainer>여행 관리</HeaderContainer>
      {trips.map((trip, index) => (
        <TripContainer key={index} onClick={() => handleTripClick(index)}>
          <CityInfo>
            <BodyBold12>{trip.country}</BodyBold12>
          </CityInfo>
          <TripInfo>
            <BodyBold15>{trip.title}</BodyBold15>
            <TripExpanationContainer>
              <BodyMedium12>{trip.country}</BodyMedium12>
            </TripExpanationContainer>
            <StateContainer>
              <PartnerStateContainer>
                <BodyBold12>동행 구함</BodyBold12>
              </PartnerStateContainer>
              <TripStateContainer>
                <BodyBold12>여행 전</BodyBold12>
              </TripStateContainer>
            </StateContainer>
          </TripInfo>
        </TripContainer>
      ))}
      <AddPlanButton
        src={AddPlan}
        onClick={handleMakeTripButtonClick}
        alt="Add Plan"
      />
    </LandingContainer>
  );
};

export default LandingPage;
