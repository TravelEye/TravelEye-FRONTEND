import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../_actions/user_action";
import { useNavigate } from "react-router-dom";
import { validUser } from "../_actions/user_action"; // Import the validUser array
import {
  RightArrowButton,
  RightArrowIcon,
  CircleContainer,
  Circle,
  SplashImage,
  AlertImage,
  AlertMessage,
  QuestionTitle,
  InputContainer,
  StageContainer,
  FirstContainer,
} from "./MakeTripPage";
import splash from "../assets/images/splash.png";
import RightArrow from "../assets/images/RightArrow.png";
const DropSet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const AgeOption = styled.select`
  height: 35px;
  margin-left: 10%;
  margin-right: 10%;
  border-radius: 20px;
  font-family: "KopubWorldDotum";
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: -0.5px;
  text-align: center;
  color: #999999;
  border: none;
  box-shadow: 0px 0px 5px 0px #00000040;
  margin-top: 3%;
  padding-left: 3%;
  padding-right: 3%;
`;
const SexOption = styled.select`
  height: 35px;
  margin-left: 10%;
  margin-right: 10%;
  border-radius: 20px;
  font-family: "KopubWorldDotum";
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: -0.5px;
  text-align: center;
  color: #999999;
  border: none;
  box-shadow: 0px 0px 5px 0px #00000040;
  margin-top: 3%;
  padding-left: 3%;
  padding-right: 3%;
`;

function SignUpPage(props) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [checkPW, setCheckPW] = useState(false);
  const [username, setUsername] = useState("");
  const [userage, setUserage] = useState("");
  const [usersex, setUsersex] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onnameHandler = (e) => {
    setUsername(e.target.value);
  };
  const onageHandler = (e) => {
    setUserage(e.target.value);
  };
  const onsexHandler = (e) => {
    setUsersex(e.target.value);
  };

  const onEmailHandler = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
  };
  const onPWcheckHandler = (event) => {
    if (Password === event.currentTarget.value) {
      setCheckPW(true);
    } else {
      setCheckPW(false);
    }
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!Email) {
      return alert("이메일을 입력하세요");
    } else if (!Password) {
      return alert("비밀번호를 입력하세요");
    } else if (!checkPW) {
      return alert("동일한 비밀번호를 입력하세요");
    } else {
      let body = {
        // let = 이 함수 내에서만 유효한 변수 선언문
        email: Email,
        password: Password,
      };
      console.log(body);

      console.log(validUser);
      validUser.push(body);
      localStorage.setItem("validUser", JSON.stringify(validUser));

      console.log(validUser);
      navigate("/");
    }
  };
  const [step, setStep] = useState(1);
  let currentStepComponent;
  const moveToNextStepButtonClick = () => {
    setStep((prevStep) => prevStep + 1);
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
              <Circle />
            </CircleContainer>
          </FirstContainer>
          <QuestionTitle>
            트래블아이는 <br /> 여행자님에 대해 알고 싶어요!
          </QuestionTitle>
          <InputContainer
            type="text"
            value={username}
            onChange={onnameHandler}
            placeholder="성함을 입력해주세요."
          />
          <DropSet>
            <AgeDropdown />
            <SexDropdown />
          </DropSet>
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
              <Circle />
            </CircleContainer>
          </FirstContainer>
          <QuestionTitle>
            트래블아이와 함께할 <br /> 이메일 주소를 정해주세요!
          </QuestionTitle>
          <InputContainer
            type="text"
            value={Email}
            onChange={onEmailHandler}
            placeholder="이메일을 입력해주세요."
          />
        </StageContainer>
      );
      break;
    case 3:
      currentStepComponent = (
        <StageContainer>
          <FirstContainer>
            <SplashImage src={splash} alt="Splash" />
            <CircleContainer>
              <Circle isGreen /> <Circle isGreen />
              <Circle isGreen />
            </CircleContainer>
          </FirstContainer>
          <QuestionTitle>
            비밀번호를 입력해 주세요. <br />
            다시 로그인할 때 필요해요.
          </QuestionTitle>
          <InputContainer
            type="password"
            value={Password}
            onChange={onPasswordHandler}
            placeholder="비밀번호를 입력해주세요."
          />
          <InputContainer
            type="password"
            onChange={onPWcheckHandler}
            placeholder="비밀번호를 입력해주세요."
          />
        </StageContainer>
      );
      break;

    default:
      currentStepComponent = null;
  }

  return (
    <div>
      {currentStepComponent}
      <RightArrowButton>
        <RightArrowIcon src={RightArrow} onClick={moveToNextStepButtonClick} />
      </RightArrowButton>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      ></form>
    </div>
  );
}

export default SignUpPage;

const AgeDropdown = ({ userage, setUserage }) => {
  const ageOptions = [
    "19세 이하",
    "20세 ~ 29세",
    "30세 ~ 39세",
    "40세 ~ 49세",
    "50세 ~ 59세",
    "60세 ~ 69세",
    "70세 이상",
  ];

  return (
    <AgeOption value={userage} onChange={(e) => setUserage(e.target.value)}>
      {ageOptions.map((ageOption) => (
        <option key={ageOption} value={ageOption}>
          {ageOption}
        </option>
      ))}
    </AgeOption>
  );
};
const SexDropdown = ({ selectedsex, onSelectSex }) => {
  const sexOptions = ["남성", "여성"];

  return (
    <SexOption
      value={selectedsex}
      onChange={(e) => onSelectSex(e.target.value)}
    >
      {sexOptions.map((sexOptions) => (
        <option key={sexOptions} value={sexOptions}>
          {sexOptions}
        </option>
      ))}
    </SexOption>
  );
};
