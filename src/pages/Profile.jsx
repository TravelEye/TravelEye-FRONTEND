import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import sample from "../assets/images/sample.png";
import block from "../assets/images/block.png";
import Fixmypage from "../assets/images/Fixmypage.png";
import Gopartner from "../assets/images/Gopartner.png";
import message from "../assets/images/message.png";

const MypageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
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

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleArrowButtonClick = () => {
    navigate(-1);
  };

  return (
    <MypageContainer>
      <TopHalf>
        <ArrowButton onClick={handleArrowButtonClick} />
        <img src={block} alt="Image 1" />
        <img src={Fixmypage} alt="Image 2" />
        <img src={Gopartner} alt="Image 3" />
        <img src={message} alt="Image 3" />
      </TopHalf>
      <BottomHalf>
        <RoundRectangle>
          <div>User Name</div>
          <div>자기소개글</div>
          <div>여행 온도</div>
          <div>여행 히스토리</div>
        </RoundRectangle>
      </BottomHalf>
    </MypageContainer>
  );
};

export default ProfilePage;
