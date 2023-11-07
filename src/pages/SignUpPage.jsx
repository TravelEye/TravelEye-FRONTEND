import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../_actions/user_action";
import { useNavigate } from "react-router-dom";
import { validUser } from "../_actions/user_action"; // Import the validUser array

function SignUpPage(props) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [checkPW, setCheckPW] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
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

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email Address를 입력해주세요</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password를 입력해주세요</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <label>Password를 다시 한 번 입력해주세요</label>
        <input type="password" onChange={onPWcheckHandler} />

        <button type="submit">회원가입하기!</button>
      </form>
    </div>
  );
}

export default SignUpPage;
