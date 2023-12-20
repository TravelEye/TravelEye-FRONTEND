import { React, useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import alert1 from "../assets/images/alert1.png";
import splash from "../assets/images/splash.png";
import search from "../assets/images/search.png";
import LeftArrow from "../assets/images/LeftArrow.png";
import RightArrow from "../assets/images/RightArrow.png";

const LandmarkSet = [
  "아시아, 대한민국, 서울, 만장굴",
  "아시아, 대한민국, 서귀포, 한라산",
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

const SearchPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [tripLandmark, setTripLandmark] = useState("");
  const handleArrowButtonClick = () => {
    navigate(-1);
  };
  const moveToPrevStepButtonClick = () => {
    setStep((prevStep) => prevStep - 1);
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
    navigate("/viewtrip", { state: { selectedLandmark } });
  };

  const [filteredLandmarks, setFiltereLandmarks] = useState(LandmarkSet);

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
  );
};

export default SearchPage;
