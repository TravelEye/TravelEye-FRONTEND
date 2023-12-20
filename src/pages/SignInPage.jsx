import React, { useState } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { loginUser } from "../_actions/user_action";
import { useNavigate } from "react-router-dom";
<<<<<<< Updated upstream

=======
import splash from "../assets/images/splash.png";
import { loginAPI } from "../apis/index.js";
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
export const ErrorMessage = styled.p`
  color: #ff6b6b;
  margin-bottom: 10px;
  font-size: 12px;
  text-align: center;
  width: 100%;
`;
>>>>>>> Stashed changes
function SignInPage(props) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
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
      const response = await loginAPI(data);
      if (response) {
        setLoginSuccess(true);
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
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
<<<<<<< Updated upstream
        <label>Email Address</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <button type="submit">Login</button>
=======
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
>>>>>>> Stashed changes
      </form>
      {loginSuccess && <p>Login Successful</p>}
      {!loginSuccess && <p>Login Failed</p>}
      <button onClick={SignupHandler}>Sign up</button>
    </div>
  );
}

export default SignInPage;
