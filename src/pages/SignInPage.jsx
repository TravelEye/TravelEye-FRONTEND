import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../_actions/user_action";
import { useNavigate } from "react-router-dom";

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
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email Address</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <button type="submit">Login</button>
      </form>
      {loginSuccess && <p>Login Successful</p>}
      {!loginSuccess && <p>Login Failed</p>}
      <button onClick={SignupHandler}>Sign up</button>
    </div>
  );
}

export default SignInPage;
