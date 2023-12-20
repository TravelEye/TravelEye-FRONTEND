import { React, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import alert1 from "../assets/images/alert1.png";
import splash from "../assets/images/splash.png";
import search from "../assets/images/search.png";
import LeftArrow from "../assets/images/LeftArrow.png";
import RightArrow from "../assets/images/RightArrow.png";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { BodyMedium15 } from "./fonts";

const DestinationSet = [
  "아시아, 대한민국, 서울",
  "아시아, 대한민국, 부산",
  "아시아, 대한민국, 인천",
  "아시아, 대한민국, 대구",
  "아시아, 대한민국, 광주",
  "아시아, 대한민국, 대전",
  "아시아, 대한민국, 울산",
  "아시아, 대한민국, 세종",
  "아시아, 대한민국, 속초",
  "아시아, 대한민국, 강릉",
  "아시아, 대한민국, 춘천",
  "아시아, 대한민국, 원주",
  "아시아, 대한민국, 동해",
  "아시아, 대한민국, 태백",
  "아시아, 대한민국, 삼척",
  "아시아, 대한민국, 청주",
  "아시아, 대한민국, 천안",
  "아시아, 대한민국, 청주",
  "아시아, 대한민국, 충주",
  "아시아, 대한민국, 전주",
  "아시아, 대한민국, 군산",
  "아시아, 대한민국, 김제",
  "아시아, 대한민국, 남원",
  "아시아, 대한민국, 화성",
  "아시아, 대한민국, 남양주",
  "아시아, 대한민국, 용인",
  "아시아, 대한민국, 부천",
  "아시아, 대한민국, 안양",
  "아시아, 대한민국, 평택",
  "아시아, 대한민국, 고양",
  "아시아, 대한민국, 안산",
  "아시아, 대한민국, 포항",
  "아시아, 대한민국, 창원",
  "아시아, 대한민국, 김해",
  "아시아, 대한민국, 남해",
  "아시아, 대한민국, 제주",
  "아시아, 대한민국, 서귀포",
];
const LandingContainer = styled.div`
  background-color: white;
  z-index: 1;
  position: relative;
  padding-bottom: 60px;
  height: 80vh;
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
`;

export const RoundedRectangle = styled.div`
  display: flex;
  align-items: center;
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

export const RightArrowButton = styled.div`
  position: absolute;
  bottom: 80px;
  right: 40px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #50e293;
  border-radius: 50%;
`;
export const RightArrowIcon = styled.img`
  width: 65%;
  height: 65%;
  border-radius: 50%;
`;

export const CircleContainer = styled.div`
  display: flex;
`;

export const Circle = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 5px;
  margin-right: 5px;
  background-color: ${(props) => (props.isGreen ? "#50e293" : "#D9D9D9")};
`;
export const SplashImage = styled.img`
  width: 81px;
  height: 50px;
  margin-bottom: 20px;
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

export const QuestionTitle = styled.div`
  font-family: "KopubWorldDotum";
  font-size: 24px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.5px;
  text-align: left;
  color: black;
  margin: 10px 25px 20px 25px;
`;
export const InputContainer = styled.input`
  position: relative;
  width: 80%;
  margin-left: 5%;
  padding: 10px;
  border: none;
  border-bottom: 2px solid black;
  outline: none;
  font-family: KoPubWorldDotum;
  font-size: 15px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.5px;
  text-align: left;
  color: #999999;
`;

const TripInput = styled.input`
  position: absolute;
  top: 0;
  width: 80%;
  padding: 10px;
  border: none;
  border-bottom: 2px solid black;
  outline: none;
  font-size: 16px;
`;

const TripHint = styled.span`
  position: absolute;
  left: 4px;
  pointer-events: none;
  transition: top 0.3s, font-size 0.3s;
  font-family: "KopubWorldDotum";
  font-size: 15px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.5px;
  text-align: left;
  color: #999999;
  ${(props) => (props.isActive ? "color: transparent" : "")};
`;

export const StageContainer = styled.div``;
export const FirstContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 150px 25px 20px 25px;
`; //TRBL

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

const SearchImage = styled.img`
  width: 25px;
  height: 32.36px;
`;

const DestinationViewer = styled.button`
  position: relative;
  width: 80%;
  margin-left: 5%;
  padding: 10px;
  border: none;
  border-bottom: 2px solid black;
  outline: none;
  font-family: KoPubWorldDotum;
  font-size: 15px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.5px;
  text-align: left;
  color: #999999;
  background-color: transparent;
`;
const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const DateContainer = styled.div`
  display: flex;
  margin-top: 20%;
  margin-bottom: 10%;
  padding-left: 5%;
  padding-right: 5%;
  gap: 2%;
  background-color: #50e293;
  border-radius: 20px;
  border: none;
  height: 50px;
  justify-content: space-between;
  align-items: center;
`;
const DateViewer = styled.div`
  padding-left: 1%;
  padding-right: 1%;
  background-color: white;
  border-radius: 20px;
  border: none;
  height: 25px;
  color: black;
  width: 100%;
`;
const Datetext = styled.div`
  width: 100%;
  font-family: KoPubWorldDotum;
  font-size: 15px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: -0.5px;
`;
const MakeTripPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleArrowButtonClick = () => {
    navigate(-1);
  };
  const moveToNextStepButtonClick = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const moveToPrevStepButtonClick = () => {
    setStep((prevStep) => prevStep - 1);
  };

  let currentStepComponent;

  const [tripname, setTripName] = useState("");
  const handletripname = (e) => {
    setTripName(e.target.value);
  };
  const [tripdestination, setTripDestination] = useState("");
  const handletripdestination = (e) => {
    setTripDestination(e.target.value);
  };

  const [searchText, setSearchText] = useState("");
  const handleSearchInputChange = (e) => {
    const inputText = e.target.value;
    setSearchText(inputText);

    const filteredResults = DestinationSet.filter((destination) =>
      destination.toLowerCase().includes(inputText.toLowerCase())
    );
    setFilteredDestinations(filteredResults);
  };
  const handleDestinationClick = (selectedDestination) => {
    setTripDestination(selectedDestination);
    setStep(2);
  };

  const [filteredDestinations, setFilteredDestinations] =
    useState(DestinationSet);

  const handleDestinationViewerClick = () => {
    setStep(100);
  };

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [date, setDate] = useState(new Date());

  const formatDate = (date) => {
    if (!date) {
      date = new Date();
    }

    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}년 ${month}월 ${day}일`;
  };

  switch (step) {
    case 0:

    case 1:
      currentStepComponent = (
        <StageContainer>
          <FirstContainer>
            <SplashImage src={splash} alt="Splash" />
            <CircleContainer>
              <Circle isGreen /> <Circle />
              <Circle /> <Circle />
            </CircleContainer>
          </FirstContainer>
          <QuestionTitle>
            여행을 <br /> 어떻게 부르면 <br /> 좋을까요?
          </QuestionTitle>
          <InputContainer
            type="text"
            value={tripname}
            onChange={handletripname}
            placeholder="여행 이름을 입력해요."
          />
        </StageContainer>
      );
      break;
    case 2:
      currentStepComponent = (
        <StageContainer>
          <FirstContainer>
            <SplashImage src={splash} alt="Splash" />
            <CircleContainer>
              <Circle isGreen /> <Circle isGreen />
              <Circle /> <Circle />
            </CircleContainer>
          </FirstContainer>
          <QuestionTitle>
            여행의 목적지는 <br /> 어디인가요?
          </QuestionTitle>
          <DestinationViewer onClick={handleDestinationViewerClick}>
            {tripdestination || "여행 목적지를 설정해요."}
          </DestinationViewer>
        </StageContainer>
      );
      break;
    case 100:
      currentStepComponent = (
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
          {filteredDestinations.length === 0 && (
            <div>
              <AlertImage src={alert1} alt="Splash" />
              <AlertMessage>
                앗, 찾으시는 여행지가 없어요! <br /> 검색어를 수정하거나 다시
                입력해 주세요.
              </AlertMessage>
            </div>
          )}
          {filteredDestinations.map((destination, index) => (
            <div
              key={index}
              onClick={() => handleDestinationClick(destination)}
            >
              {destination}
            </div>
          ))}
        </StageContainer>
      );
      break;
    case 3:
      currentStepComponent = (
        <CalendarContainer>
          <DateContainer>
            <DateViewer>{formatDate(date[0])}</DateViewer>
            <BodyMedium15>부터</BodyMedium15>
            <DateViewer>{formatDate(date[1])}</DateViewer>
            <BodyMedium15>까지</BodyMedium15>
          </DateContainer>
          <div className="calendar-container">
            <Calendar onChange={setDate} value={date} selectRange={true} />
          </div>
          {date.length > 0 ? (
            <p className="text-center">
              <span className="bold">Start:</span> {date[0].toDateString()}
              &nbsp;|&nbsp;
              <span className="bold">End:</span> {date[1].toDateString()}
            </p>
          ) : (
            <p className="text-center">
              <span className="bold">Default selected date:</span>{" "}
              {date.toDateString()}
            </p>
          )}
        </CalendarContainer>
      );
      break;
    case 5:
      currentStepComponent = (
        <StageContainer>
          <CircleContainer>
            <Circle isGreen /> <Circle isGreen />
            <Circle isGreen /> <Circle />
          </CircleContainer>
          <p>여행 날짜</p>
        </StageContainer>
      );
      break;
    case 6:
      currentStepComponent = (
        <StageContainer>
          <CircleContainer>
            <Circle isGreen /> <Circle isGreen />
            <Circle isGreen /> <Circle isGreen />
          </CircleContainer>
        </StageContainer>
      );
      break;
    default:
      currentStepComponent = null;
  }
  let headerText = "여행 등록하기";
  if (step === 100) {
    headerText = "목적지 설정";
  }

  return (
    <LandingContainer>
      <HeaderContainer>
        <LeftArrowButton
          onClick={() => {
            if (step === 1) {
              handleArrowButtonClick();
            } else if (step === 100) {
              setStep(2);
            } else {
              moveToPrevStepButtonClick();
            }
          }}
        >
          <LeftArrowIcon src={LeftArrow} />
        </LeftArrowButton>
        {headerText}
        <div style={{ marginRight: "10px" }} />
      </HeaderContainer>

      {currentStepComponent}
      <RightArrowButton>
        <RightArrowIcon src={RightArrow} onClick={moveToNextStepButtonClick} />
      </RightArrowButton>
    </LandingContainer>
  );
};

export default MakeTripPage;
