import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import sample from "../assets/images/sample.png";
import temperature_bar from "../assets/images/temperature_bar.png";
import block from "../assets/images/block.png";
import message from "../assets/images/message.png";
import kakaoicon from "../assets/images/kakaoicon.png";
import instaicon from "../assets/images/instaicon.png";

import {
  TitleBold,
  SubTitleMedium,
  BodyMedium15,
  BodyMedium12,
  BodyBold15,
  BodyBold12,
} from "./fonts.js";

const MypageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
`;

const TopHalf = styled.div`
  flex: 1;
  background-image: url(${sample});
  background-size: cover;
  padding-bottom: 20px;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 40%;
`;

const ArrowButton = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 25px;
  height: 25px;
  background-color: transparent;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  &::before {
    content: "←";
    font-size: 30px;
    color: white;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 75%;
  margin-left: 10%;
  margin-right: 10%;
`;

const BlockIcon = styled.img`
  width: 30px;
  height: 30px;
`;
const MessageIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-left: 40%;
`;
const BottomHalf = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  position: absolute;
  background-color: white;
  top: 40%;
  right: 0;
  left: 0;
  bottom: 0;
`;

const FixButton = styled.div`
  height: 30px;
  background-color: #50e293;
  border-radius: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: 5%;
`;
const RoundRectangle = styled.div`
  flex: 1;
  width: 100%;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 20px;
`;

const TemperatureBar = styled.div`
  position: absolute;
  width: ${({ temperature }) => `${temperature}%`};
  height: 8px;
  background-color: #fa4747;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  margin-left: 1.5%;
  margin-top: 5px;
  z-index: 1;
`;

const TemperatureBar2 = styled.img`
  position: absolute;
  width: 80%;
  height: 20px;
`;
const TemperatureNotifier = styled.div`
  margin-left: calc(
    ${({ temperature }) => `${temperature + 1.5}%`} / 310 * 390 - 15px
  );
`;
const TriangleContainer = styled.div`
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 8px solid #d9d9d9;
  margin-top: 30px;
`;
const Temperaturevalue = styled.div`
  font-family: KoPubWorldDotum;
  font-size: 12px;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: -0.5px;
  text-align: left;
`;
const Usernametext = styled.div`
  font-family: KoPubWorldDotum;
  font-size: 24px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.5px;
  text-align: left;
  color: black;
`;
const IntroductionText = styled.div`
  font-family: KoPubWorldDotum;
  font-size: 15px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: -0.5px;
  text-align: left;
  color: black;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const TempText = styled.div`
  font-family: KoPubWorldDotum;
  font-size: 15px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.5px;
  text-align: left;
  color: black;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const HistoryContainer = styled.div`
  display: flex;
  padding-bottom: 20px;
`;

const TextContainer = styled.div`
  flex: 1;
`;

const ImageContainer = styled.div`
  flex: 0 0 30%;
  border-radius: 15px;
  overflow: hidden;
  margin-right: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const triphistory = [
  {
    nickname: "여행 별명 1",
    description: "여행 설명 1",
    partners: ["Juliette", "Christoph", "Philip"],
    startdate: new Date("2023-11-10T00:01:01"),
    enddate: new Date("2023-11-30T00:01:01"),
  },
  {
    nickname: "여행 별명 2",
    description: "여행 설명 2",
    partners: ["짱구", "맹구", "흰둥이"],
    startdate: new Date("2023-12-10T00:01:01"),
    enddate: new Date("2024-11-30T00:01:01"),
  },
  {
    nickname: "여행 별명 3",
    description: "여행 설명 3",
    partners: ["루피", "나미", "우솝"],
    startdate: new Date("2023-01-10T00:01:01"),
    enddate: new Date("2024-02-30T00:01:01"),
  },
];

const UserProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location?.state?.partnername || null;

  const handleArrowButtonClick = () => {
    navigate(-1);
  };
  const handleFixButtonClick = () => {
    navigate("/fixprofile");
  };
  const handleMessageClick = () => {
    //navigate("/fixprofile");
  };

  const initialTemperature = 36.5;
  const initialusername = "홍길동";
  const initialintroduction =
    "여행의 묘미는 언제나 예상치 못한 곳에서 나타나죠. 동행을 구해보는 건 어때요? 즐거운 여행의 시작, 트래블아이! 트래블아이와 함께 즐거운 여행 되세요.";

  return (
    <MypageContainer>
      <TopHalf>
        <ArrowButton onClick={handleArrowButtonClick} />
        <ButtonContainer>
          <BlockIcon src={block} onClick={handleFixButtonClick} />
          <MessageIcon src={message} onClick={handleFixButtonClick} />
          <FixButton onClick={handleFixButtonClick}>
            <BodyBold15>동행 신청</BodyBold15>
          </FixButton>
        </ButtonContainer>
      </TopHalf>
      <BottomHalf>
        <RoundRectangle>
          <Usernametext>{username}</Usernametext>
          <IntroductionText>{initialintroduction}</IntroductionText>
          <TempText>{username} 님의 여행 온도</TempText>
          <TemperatureBar temperature={initialTemperature} />
          <TemperatureBar2 src={temperature_bar} />
          <TemperatureNotifier temperature={initialTemperature}>
            <TriangleContainer />
            <Temperaturevalue>{initialTemperature}℃</Temperaturevalue>
          </TemperatureNotifier>
          <TempText>{username} 님의 여행 히스토리</TempText>
          {triphistory.map((trip, index) => (
            <HistoryContainer key={index}>
              <ImageContainer>
                <Image src={sample} />
              </ImageContainer>
              <TextContainer>
                <TempText>{trip.nickname}</TempText>
                <TempText>{trip.description}</TempText>
                <IntroductionText>
                  {trip.partners.map((partner, index) => (
                    <React.Fragment key={index}>
                      {partner}님{index < trip.partners.length - 1 && ", "}
                    </React.Fragment>
                  ))}
                  과 함께 했어요.
                </IntroductionText>
                <TempText>
                  {trip.startdate.getFullYear()}년{" "}
                  {trip.startdate.getMonth() + 1}월 {trip.startdate.getDate()}일
                  ~ {trip.enddate.getFullYear()}년 {trip.enddate.getMonth() + 1}
                  월 {trip.enddate.getDate()}일
                </TempText>
              </TextContainer>
            </HistoryContainer>
          ))}
        </RoundRectangle>
      </BottomHalf>
    </MypageContainer>
  );
};

export default UserProfilePage;
