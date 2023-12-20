import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import sample from "../assets/images/sample.png";
import alert1 from "../assets/images/alert1.png";
import search from "../assets/images/search.png";
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
import { format } from "date-fns";

const LandmarkSet = [
  "아시아, 대한민국, 서울, 만장굴",
  "아시아, 대한민국, 서귀포, 한라산",
];

const ViewTripContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
  padding-bottom: 60px;
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

const LandingContainer = styled.div`
  background-color: white;
  z-index: 1;
  position: relative;
  padding-bottom: 60px;
  height: 100vh;
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
const SearchHintContainer = styled.div`
  display: flex;
  flex: 1;
  background-color: white;
  justify-content: space-between;
  padding: 10px;
  margin-top: 50px;
  border-radius: 20px;
  box-shadow: 0px 0px 5px 0px #00000040;
  margin-left: 15px;
  margin-right: 15px;
`;

const SearchHintText = styled.input`
  font-family: KoPubWorldDotum;
  font-size: 20px;
  font-weight: 500;
  line-height: 26px;
  letter-spacing: -0.5px;
  text-align: left;
  color: #999999;
  border: none;
  outline: none;
`;
export const StageContainer = styled.div``;

const SearchImage = styled.img`
  width: 25px;
  height: 32.36px;
`;
export const AlertImage = styled.img`
  width: 74.91px;
  height: 67px;
  margin-bottom: 20px;
  margin-left: 40%;
  margin-top: 40%;
`;
export const AlertMessage = styled.div`
  font-family: "KopubWorldDotum";
  font-size: 20px;
  font-weight: 500;
  line-height: 26px;
  letter-spacing: -0.5px;
  text-align: center;
  color: #999999;
  margin: 10px 25px 20px 25px;
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
  const [showAddPlaceOverlay, setShowAddPlaceOverlay] = useState(false);
  const [newPlaceName, setNewPlaceName] = useState("");
  const [editingDayIndex, setEditingDayIndex] = useState(null); // Add this line

  const generateDays = (startDateString, endDateString) => {
    const days = [];
    let currentDate = new Date(startDateString);

    while (currentDate <= new Date(endDateString)) {
      days.push({
        day: days.length + 1,
        date: new Date(currentDate),
        places: [],
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };
  const [places, setPlaces] = useState([]);
  const handleAddPlace = (dayIndex) => {
    setShowAddPlaceOverlay(true);
    setEditingDayIndex(dayIndex);
  };

  const handleAddPlaceConfirm = (plname) => {
    console.log(1);

    const newPlace = {
      name: plname,
      address: "대전광역시 서구 둔산대로 169",
    };

    setDays((prevPlaces) => {
      const updatedPlaces = [...prevPlaces];
      updatedPlaces[editingDayIndex].places.push(newPlace);
      return updatedPlaces;
    });

    setShowAddPlaceOverlay(false);
    setNewPlaceName("");
    setEditingDayIndex(null);
  };
  const handleRemovePlace = (editingDayIndex, placeIndex) => {
    setDays((prevDays) => {
      const updatedDays = [...prevDays];
      updatedDays[editingDayIndex].places.splice(placeIndex, 1);
      return updatedDays;
    });
  };
  const [searchText, setSearchText] = useState("");

  const handleSearchInputChange = (e) => {
    const inputText = e.target.value;
    setSearchText(inputText);

    const filteredResults = LandmarkSet.filter((landmark) =>
      landmark.toLowerCase().includes(inputText.toLowerCase())
    );
    setFiltereLandmarks(filteredResults);
  };

  const handleLandmarkClick = (selectedLandmark) => {
    setNewPlaceName(selectedLandmark);
    console.log(selectedLandmark);
    console.log(newPlaceName);
    handleAddPlaceConfirm(selectedLandmark);
  };

  const [filteredLandmarks, setFiltereLandmarks] = useState(LandmarkSet);
  const tripData = location?.state?.tripData || null;

  useEffect(() => {
    if (tripData) {
      const startDateString = tripData.startDate;
      const endDateString = tripData.endDate;

      setDays(generateDays(startDateString, endDateString));
    }
  }, [tripData]);
  const [days, setDays] = useState([]);
  const handleleftClick = () => {
    navigate(-1);
  };
  return (
    <ViewTripContainer>
      <HeaderContainer>
        <LeftArrowButton>
          <LeftArrowIcon src={LeftArrow} onClick={handleleftClick} />
        </LeftArrowButton>
        {showAddPlaceOverlay ? "목적지 설정" : "내 여행"}
        <div style={{ marginRight: "40px" }} />
      </HeaderContainer>
      <TopHalf></TopHalf>
      <BottomHalf>
        <Title>
          <TitleBold>{tripData.title}</TitleBold>
          <BodyMedium12>
            {format(new Date(tripData.startDate), "yyyy.MM.dd")} ~
            {format(new Date(tripData.endDate), "yyyy.MM.dd")}
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
      {showAddPlaceOverlay && (
        <LandingContainer>
          <StageContainer>
            <SearchHintContainer>
              <SearchHintText
                type="text"
                value={searchText}
                onChange={handleSearchInputChange}
                placeholder="검색어를 입력해요."
              />
              <SearchImage src={search} alt="Search" />
            </SearchHintContainer>
            {filteredLandmarks.length === 0 && (
              <div>
                <AlertImage src={alert1} alt="Splash" />
                <AlertMessage>
                  앗, 찾으시는 여행지가 없어요! <br /> 검색어를 수정하거나 다시
                  입력해 주세요.
                </AlertMessage>
              </div>
            )}
            {filteredLandmarks.map((landmark, index) => (
              <div key={index} onClick={() => handleLandmarkClick(landmark)}>
                {landmark}
              </div>
            ))}
          </StageContainer>
        </LandingContainer>
      )}
    </ViewTripContainer>
  );
};

export default ViewTripPage;
