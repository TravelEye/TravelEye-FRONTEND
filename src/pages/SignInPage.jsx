import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../_actions/user_action";
import { useNavigate } from "react-router-dom";
import splash from "../assets/images/splash.png";
import {
  TitleBold,
  SubTitleMedium,
  BodyMedium15,
  BodyMedium12,
  BodyBold15,
  BodyBold12,
} from "./fonts.js";

const SplashImage = styled.img`
  max-width: 100%;
  max-height: 50vh;
  margin-bottom: 20px;
`;
const Emailinput = styled.input`
  height: 45px;
  border-radius: 20px;
  box-shadow: 0px 0px 5px 0px #00000040;
  border: none;
  margin-left: 10%;
  margin-right: 10%;
  ::placeholder {
    color: #999999;
    text-align: left;
    margin-left: 30px;
  }
`;
const Passwordinput = styled.input`
  height: 45px;
  border-radius: 20px;
  box-shadow: 0px 0px 5px 0px #00000040;
  border: none;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 5%;
  ::placeholder {
    color: #999999;
  }
`;
const LoginButton = styled.button`
  height: 45px;
  border-radius: 20px;
  background-color: #50e293;
  border: none;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 10%;
`;
function SignInPage(props) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!Email) {
      return alert("이메일을 입력하세요");
    } else if (!Password) {
      return alert("비밀번호를 입력하세요");
    } else {
      let body = {
        // let = 이 함수 내에서만 유효한 변수 선언문
        email: Email,
        password: Password,
      };
      if (dispatch(loginUser(body)).type === "LOGIN_USER") {
        setLoginSuccess(true);
        navigate("/survey");
      } else {
        setLoginSuccess(false);
      }
    }
  };
  const SignupHandler = () => {
    navigate("/signup");
  };

  return (
    <div>
      <SplashImage src={splash} alt="Splash" />
      <SubTitleMedium> 즐거운 여행의 시작,</SubTitleMedium>
      <TitleBold>트래블아이</TitleBold>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <Emailinput
          type="email"
          value={Email}
          onChange={onEmailHandler}
          placeholder="이메일을 입력해 주세요."
        />
        <Passwordinput
          type="password"
          value={Password}
          onChange={onPasswordHandler}
          placeholder="비밀번호를 입력해 주세요."
        />
        <LoginButton type="submit">
          <BodyBold15>기존 정보로 로그인하기</BodyBold15>
        </LoginButton>
      </form>
      {loginSuccess && <p>Login Successful</p>}
      {!loginSuccess && <p>Login Failed</p>}
      <button onClick={SignupHandler}>Sign up</button>
    </div>
  );
}

export default SignInPage;
