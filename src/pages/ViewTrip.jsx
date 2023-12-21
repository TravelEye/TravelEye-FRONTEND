import React, { useState, useEffect, useMemo } from "react";
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
import { useTripContext } from "./TripContext";

const LandmarkSet = [
  {
    id: 1,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "만장굴",
    latitude: "33.489011",
    longitude: "126.498302",
    address: "123 제주대로",
  },
  {
    id: 2,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "성산일출봉",
    latitude: "33.459759",
    longitude: "126.937927",
    address: "456 제주해안로",
  },
  {
    id: 3,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "평화의 소녀상",
    latitude: "33.489868",
    longitude: "126.481713",
    address: "789 갈치로",
  },
  {
    id: 4,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "용두암",
    latitude: "33.516178",
    longitude: "126.525971",
    address: "101 도령로",
  },
  {
    id: 5,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "한라산",
    latitude: "33.359305",
    longitude: "126.548059",
    address: "202 한라로",
  },
  {
    id: 6,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "오설록 티 뮤지엄",
    latitude: "33.306987",
    longitude: "126.392786",
    address: "303 효돈로",
  },
  {
    id: 7,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "제주 돌문화 공원",
    latitude: "33.447898",
    longitude: "126.558453",
    address: "404 토산로",
  },
  {
    id: 8,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "마라도 해양도서관",
    latitude: "33.290348",
    longitude: "126.297408",
    address: "505 도남로",
  },
  {
    id: 9,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "천지연 폭포",
    latitude: "33.510936",
    longitude: "126.527529",
    address: "606 삼무로",
  },
  {
    id: 10,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "올레길 7코스",
    latitude: "33.362346",
    longitude: "126.531989",
    address: "707 제주로",
  },
  {
    id: 11,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "한담동 선인장마을",
    latitude: "33.497788",
    longitude: "126.516836",
    address: "808 선인장로",
  },
  {
    id: 12,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "사려니숲길",
    latitude: "33.394506",
    longitude: "126.668412",
    address: "909 사려니로",
  },
  {
    id: 13,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "제주민속촌",
    latitude: "33.436091",
    longitude: "126.305229",
    address: "1010 돌하르방로",
  },
  {
    id: 14,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "이중섭 거리",
    latitude: "33.513095",
    longitude: "126.527222",
    address: "1111 이중섭로",
  },
  {
    id: 15,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "제주항",
    latitude: "33.514062",
    longitude: "126.523163",
    address: "1212 일주동로",
  },
  {
    id: 16,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "헌릉로",
    latitude: "33.483204",
    longitude: "126.476785",
    address: "1313 헌릉로",
  },
  {
    id: 17,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "올레길 6코스",
    latitude: "33.411399",
    longitude: "126.270282",
    address: "1414 제주로",
  },
  {
    id: 18,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "서귀포 동문시장",
    latitude: "33.246563",
    longitude: "126.509795",
    address: "1515 서문로",
  },
  {
    id: 19,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "산방산",
    latitude: "33.350481",
    longitude: "126.818004",
    address: "1616 산방로",
  },
  {
    id: 20,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "송악산",
    latitude: "33.328504",
    longitude: "126.749515",
    address: "1717 송악로",
  },
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
  const tripData = location?.state?.tripData || null;
  const { setUpdatedTripData } = useTripContext();

  const accessToken = localStorage.getItem("accessToken");
  const selectedLandmark = location?.state?.selectedLandmark || "";
  const [showAddPlaceOverlay, setShowAddPlaceOverlay] = useState(false);
  const [newPlaceName, setNewPlaceName] = useState("");
  const [editingDayIndex, setEditingDayIndex] = useState(null);
  const [memos, setMemos] = useState([]);
  useEffect(() => {
    if (tripData && tripData.memos !== null) {
      setMemos(tripData.memos);
    } else {
      setMemos([]);
    }
  }, [tripData]);
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
  console.log(accessToken);
  const handleAddPlaceConfirm = (plname, index) => {
    const newPlace = {
      name: plname,
      address: LandmarkSet[index].address,
      id: LandmarkSet[index].id,
    };
    const startDate = new Date(tripData.startDate);
    startDate.setDate(startDate.getDate() + editingDayIndex);

    const newMemo = {
      landmarkId: index + 1,
      date: startDate.toISOString(),
      latitude: parseFloat(LandmarkSet[index].latitude),
      longitude: parseFloat(LandmarkSet[index].longitude),
      title: LandmarkSet[index].title,
      country: LandmarkSet[index].country,
      city: LandmarkSet[index].city,

      address: LandmarkSet[index].address,
    };

    setMemos((prevMemos) => [...prevMemos, newMemo]);

    console.log(memos);

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
      const removedPlace = prevDays[editingDayIndex].places[placeIndex];

      setMemos((prevMemos) => {
        const updatedMemos = prevMemos.filter(
          (memo) =>
            memo.landmarkId !== removedPlace.id ||
            memo.date !== prevDays[editingDayIndex].date.toISOString()
        );
        return updatedMemos;
      });

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

  const handleLandmarkClick = (selectedLandmark, index) => {
    setNewPlaceName(selectedLandmark);
    handleAddPlaceConfirm(selectedLandmark, index);
  };

  const initialFilteredLandmarks = LandmarkSet.map(
    ({ continent, country, city, title }) => {
      return `${continent}, ${country}, ${city}, ${title}`;
    }
  );

  const [filteredLandmarks, setFiltereLandmarks] = useState(
    initialFilteredLandmarks
  );
  console.log(filteredLandmarks);

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

  const handleUpdateTrip = async () => {
    const updatedTripData = {
      tripId: tripData.tripId,
      title: tripData.title,
      country: tripData.country,
      city: "제주시",
      startDate: tripData.startDate,
      endDate: tripData.endDate,
      memos: memos,
    };
    console.log(updatedTripData);

    setUpdatedTripData(updatedTripData);
  };

  /*const handleUpdateTrip = async () => {
    try {
      const updatedTripData = {
        tripId: tripData.tripId,
        title: tripData.title,
        country: tripData.country,
        city: "제주시",
        startDate: tripData.startDate,
        endDate: tripData.endDate,
        memos: memos,
      };
      console.log(updatedTripData);

      const response = await axios.put(
        "http://127.0.0.1:80/trip",
        updatedTripData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setUpdatedTripData(updatedTripData);
      console.log(updatedTripData);

      console.log(response.data);
    } catch (error) {
      setUpdatedTripData(updatedTripData);

      console.error("Trip 업데이트 중 에러:", error);
    }
  };*/
  const handleResetMemos = () => {
    setMemos([]);
  };
  const superindex = useMemo(() => {
    if (memos.length > 0) {
      const startDate = new Date(tripData.startDate);
      const firstMemoDate = new Date(memos[0].date);
      const superindex = Math.ceil(
        (firstMemoDate - startDate) / (1000 * 60 * 60 * 24)
      );

      return superindex;
    }
    return 1;
  }, [memos, tripData.startDate]);
  console.log(superindex);

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
        <button onClick={handleResetMemos}>Reset Memos</button>

        <BodyMedium12>여행의 묘미는 언제나!</BodyMedium12>
        <button onClick={handleUpdateTrip}>수정완료</button>

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
              <div
                key={index}
                onClick={() => handleLandmarkClick(landmark, index)}
              >
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
