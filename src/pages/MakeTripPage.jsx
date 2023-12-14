import { React, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import alert1 from "../assets/images/alert1.png";
import splash from "../assets/images/splash.png";
import search from "../assets/images/search.png";
import LeftArrow from "../assets/images/LeftArrow.png";
import RightArrow from "../assets/images/RightArrow.png";

import KopubWorldDotum from "../assets/fonts/font.css";
import HeaderContainer from "./LandingPage";

const LandingContainer = styled.div`
  background-color: white;
  //padding: 20px;
  z-index: 1;
`;

const RoundedRectangle = styled.div`
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
  margin-right: 10px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const LeftArrowIcon = styled.img`
  width: 80%;
  height: 80%;
  border-radius: 50%;
`;

const RightArrowButton = styled.div`
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
const RightArrowIcon = styled.img`
  width: 65%;
  height: 65%;
  border-radius: 50%;
`;

const CircleContainer = styled.div`
  display: flex;
`;

const Circle = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 5px;
  margin-right: 5px;
  background-color: ${(props) => (props.isGreen ? "#50e293" : "#D9D9D9")};
`;
const SplashImage = styled.img`
  width: 81px;
  height: 50px;
  margin-bottom: 20px;
`;
const AlertImage = styled.img`
  width: 74.91px;
  height: 67px;
  margin-bottom: 20px;
  margin-left: 40%;
  margin-top: 40%;
`;
const AlertMessage = styled.div`
  font-family: "KopubWorldDotum";
  font-size: 20px;
  font-weight: 500;
  line-height: 26px;
  letter-spacing: -0.5px;
  text-align: center;
  color: #999999;
  margin: 10px 25px 20px 25px;
`;

const QuestionTitle = styled.div`
  font-family: "KopubWorldDotum";
  font-size: 24px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.5px;
  text-align: left;
  color: black;
  margin: 10px 25px 20px 25px;
`;
const InputContainer = styled.input`
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

const StageContainer = styled.div``;
const FirstContainer = styled.div`
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
    setSearchText(e.target.value);
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
          <InputContainer
            type="text"
            value={tripdestination}
            onChange={handletripdestination}
            placeholder="여행 목적지를 설정해요."
          />
        </StageContainer>
      );
      break;
    case 3:
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
        </StageContainer>
      );
      break;
    case 4:
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
          <AlertImage src={alert1} alt="Splash" />
          <AlertMessage>
            앗, 찾으시는 여행지가 없어요! <br /> 검색어를 수정하거나 다시 입력해
            주세요.
          </AlertMessage>
        </StageContainer>
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

  return (
    <LandingContainer>
      <RoundedRectangle>
        <LeftArrowButton
          onClick={
            step === 1 ? handleArrowButtonClick : moveToPrevStepButtonClick
          }
        >
          <LeftArrowIcon src={LeftArrow} />
        </LeftArrowButton>
        여행 등록하기
      </RoundedRectangle>

      {currentStepComponent}
      <RightArrowButton>
        <RightArrowIcon src={RightArrow} onClick={moveToNextStepButtonClick} />
      </RightArrowButton>
    </LandingContainer>
  );
};

export default MakeTripPage;
