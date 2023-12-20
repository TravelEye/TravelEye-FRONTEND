import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { loginUser } from "../_actions/user_action";
import { useNavigate } from "react-router-dom";
import splash from "../assets/images/splash.png";
import { loginAPI } from "../apis/login";
import {
  TitleBold,
  SubTitleMedium,
  BodyMedium15,
  BodyMedium12,
  BodyBold15,
  BodyBold12,
} from "./fonts.js";

const SplashImage = styled.img`
  width: 200px;
  // max-width: 100%;
  // max-height: 50vh;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;
const Emailinput = styled.input`
  height: 45px;
  border-radius: 20px;
  box-shadow: 0px 0px 5px 0px #00000040;
  border: none;
  padding-left: 20px;
  margin-left: 15%;
  margin-right: 15%;
  ::placeholder {
    color: #999999;
    text-align: left;
    margin-left: 30px;
  }
`;
const Passwordinput = styled.input`
  padding-left: 20px;
  height: 45px;
  border-radius: 20px;
  box-shadow: 0px 0px 5px 0px #00000040;
  border: none;
  margin-left: 15%;
  margin-right: 15%;
  margin-top: 15px;
  ::placeholder {
    color: #999999;
  }
`;
const LoginButton = styled.button`
  padding: 12px;
  border-radius: 20px;
  background-color: #50e293;
  border: none;
  margin-left: 15%;
  margin-right: 15%;
  margin-top: 15px;
`;

export const ErrorMessage = styled.p`
  color: #ff6b6b;
  margin-bottom: 10px;
  font-size: 12px;
  text-align: center;
  width: 100%;
`;

function SignInPage(props) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const data = {
      email: Email,
      password: Password,
    };
    try {
      console.log(data);
      const response = await loginAPI(data);

      if (response) {
        navigate("/landing");
      }
    } catch (error) {
      setErrorMsg("이메일 혹은 비밀번호 일치하지 않습니다.");
    }
  };
  const SignupHandler = () => {
    navigate("/signup");
  };

  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          margin: "80px 0px",
        }}
      >
        <SplashImage src={splash} alt="Splash" />
      </div>
      <SubTitleMedium style={{ textAlign: "center" }}>
        즐거운 여행의 시작,
      </SubTitleMedium>
      <TitleBold style={{ textAlign: "center", marginBottom: "50px" }}>
        트래블아이
      </TitleBold>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <Emailinput
          type="email"
          value={Email}
          onChange={onEmailHandler}
          placeholder="이메일을 입력해 주세요."
          required={true}
        />
        <Passwordinput
          type="password"
          value={Password}
          onChange={onPasswordHandler}
          placeholder="비밀번호를 입력해 주세요."
          required={true}
        />
        {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
        <LoginButton type="submit">
          <BodyBold15>기존 정보로 로그인하기</BodyBold15>
        </LoginButton>
        <LoginButton onClick={SignupHandler}>
          <BodyBold15>새롭게 회원가입하기</BodyBold15>
        </LoginButton>
      </form>
    </div>
  );
}

export default SignInPage;
