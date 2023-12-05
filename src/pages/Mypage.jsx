import React, { useState } from "react";
import styled from "styled-components";
import ProfilePage from "./Profile";
import { Link, useNavigate } from "react-router-dom";
import sample from "../assets/images/sample.png";
import block from "../assets/images/block.png";
import Fixmypage from "../assets/images/Fixmypage.png";
import Gopartner from "../assets/images/Gopartner.png";
import message from "../assets/images/message.png";

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

const MypageContainer = styled.div`
  background-color: white;
  padding: 20px;
  z-index: 1;
`;

const TopHalf = styled.div`
  flex: 1;
  background-image: url(${sample});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 20px;
`;
const ProfilImageContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background: #ccc;
`;
const CircularImageElement = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
const OperatingContainer = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;

const ProfileButton = styled.button``;
const BottomHalf = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const WhiteBox = styled.div`
  flex: 1;
  width: 100%;

  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px;
`;
const RoundRectangle = styled.div`
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 20px;
`;

const Mypage = () => {
  const navigate = useNavigate();
  const handleProfileButtonClick = () => {
    navigate("/profile");
  };

  return (
    <MypageContainer>
      <RoundedRectangle>여행 관리</RoundedRectangle>
      <ProfilImageContainer>
        <CircularImageElement src={sample} alt="Circular" />
      </ProfilImageContainer>
      <p>닉네임</p>
      <p>자기소개 글</p>
      <ProfileButton onClick={handleProfileButtonClick}>
        상세 보기
      </ProfileButton>
      <OperatingContainer>1:1 문의 남기기</OperatingContainer>
      <OperatingContainer>개인정보처리방침</OperatingContainer>
      <OperatingContainer>이용약관</OperatingContainer>
      <OperatingContainer>버전정보</OperatingContainer>
    </MypageContainer>
  );
};

export default Mypage;
