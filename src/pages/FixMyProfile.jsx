import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import sample from "../assets/images/sample.png";
import Fixmypage from "../assets/images/Fixmypage.png";
import kakaoicon from "../assets/images/kakaoicon.png";
import instaicon from "../assets/images/instaicon.png";

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
  display: flex;
  justify-content: center;
  align-items: flex-end;
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

const BottomHalf = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
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
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  margin-bottom: 65%;
  margin-left: 68%;
  margin-right: 10%;
  background-color: #50e293;
  border-radius: 20px;
  text-align: center;
  font-family: KoPubWorldDotum;
  font-size: 12px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.5px;
  z-index: 2;
`;
const RoundRectangle = styled.div`
  background-color: white;
  padding: 20px;
`;
const UsernameContainer = styled.input`
  border: none;
  border-bottom: 2px solid black;
  outline: none;
  font-family: KoPubWorldDotum;
  font-size: 24px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.5px;
  text-align: left;
  color: #999999;
`;
const IntroductionContainer = styled.input`
  border-radius: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  height: 95px;
  width: 80%;
  background-color: #e2e2e2;
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: -0.5px;
  text-align: left;
  border: none;
  color: #999999;
`;
const InstaaddressContainer = styled.input`
  width: 80%;
  border: none;
  border-bottom: 2px solid black;
  outline: none;
  font-family: KoPubWorldDotum;
  font-size: 12px;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: -0.5px;
  text-align: left;
  color: #999999;
`;
const FontStyleBodyMedium15 = styled.div`
  font-family: KoPubWorldDotum;
  font-size: 15px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: -0.5px;
  text-align: left;
`;
const FontStyleBodyBold15 = styled.div`
  display: flex;
  align-items: center;

  font-family: KoPubWorldDotum;
  font-size: 15px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.5px;
  text-align: left;
`;
const SNSIcon = styled.img`
  width: 34px;
  height: 35px;
  margin-right: 5px;
`;
const FixMyProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const information = location?.state?.information || null;
  console.log(information);

  const handleArrowButtonClick = () => {
    navigate(-1);
  };
  const handleFixButtonClick = async () => {
    try {
      const response = await axios.put(
        "http://127.0.0.1:80/member/myinfo",
        {
          nickname: username,
          introduction: introduction,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMkBnbWFpbC5jb20iLCJhdXRoIjoiVVNFUiIsImV4cCI6MTcwMzE0NDM4N30.MWRiS8ixj5yRg8-ayydUQgUImnrA9_HRFYJik4iZ8fUHPDDhySEqw0K-NUR_1__I2jXuev7UZC6fWCom_U4uoQ",
            "Content-type": "application/json",
          },
        }
      );

      console.log(response.data);

      navigate(-2);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  const [username, SetUsername] = useState(information.nickname);
  const handleusername = (e) => {
    SetUsername(e.target.value);
  };
  const [introduction, SetIntroduction] = useState(information.introduction);
  const handleintroduction = (e) => {
    SetIntroduction(e.target.value);
  };

  const [kakaoid, SetKakaoid] = useState("");
  const handlekakaoid = (e) => {
    SetKakaoid(e.target.value);
  };

  const [instaaddress, SetInstaaddress] = useState("");
  const handleinstaaddress = (e) => {
    SetInstaaddress(e.target.value);
  };

  return (
    <MypageContainer>
      <TopHalf>
        <ArrowButton onClick={handleArrowButtonClick} />
      </TopHalf>
      <BottomHalf>
        <RoundRectangle>
          <UsernameContainer
            type="text"
            value={username}
            onChange={handleusername}
            placeholder={information.nickname}
          />
          <IntroductionContainer
            type="text"
            value={introduction}
            onChange={handleintroduction}
            placeholder="자기소개를 입력해요. (최대 200Byte)"
          />
          <FontStyleBodyBold15>
            <SNSIcon src={kakaoicon} />
            카카오톡 연동하기
          </FontStyleBodyBold15>
          <FontStyleBodyMedium15>
            @
            <InstaaddressContainer
              type="text"
              value={kakaoid}
              onChange={handlekakaoid}
              placeholder="카카오톡 아이디를 입력해요."
            />
          </FontStyleBodyMedium15>
          <FontStyleBodyBold15>
            <SNSIcon src={instaicon} />
            인스타그램 연동하기
          </FontStyleBodyBold15>
          <FontStyleBodyMedium15>
            https://
            <InstaaddressContainer
              type="text"
              value={instaaddress}
              onChange={handleinstaaddress}
              placeholder="인스타그램 주소를 입력해요."
            />
          </FontStyleBodyMedium15>
        </RoundRectangle>
        <FixButton onClick={handleFixButtonClick}>수정 완료하기</FixButton>
      </BottomHalf>
    </MypageContainer>
  );
};

export default FixMyProfilePage;
