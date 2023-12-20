import React, { useState } from "react";
import styled from "styled-components";
import splash from "../assets/images/splash.png";

const SplashContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: white;
`;

const SplashImage = styled.img`
  max-width: 100%;
  max-height: 50vh;
  margin-bottom: 20px;
`;

const NumberText = styled.div`
  font-size: 24px;
  color: black;
`;

const SplashPage = () => {
  return (
    <SplashContainer>
      <SplashImage src={splash} alt="Splash" />
      <NumberText>즐거운 여행의 시작,</NumberText>
      <NumberText>트래블아이</NumberText>
    </SplashContainer>
  );
};

export default SplashPage;
