import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { signupAPI, checkEmailAPI } from "../apis/signup";
import { useNavigate } from "react-router-dom";
import { BsCheck } from "react-icons/bs";
import { TitleBold, SubTitleMedium, BodyBold12 } from "./fonts.js";
import {
  RightArrowButton,
  RightArrowIcon,
  CircleContainer,
  Circle,
  SplashImage,
  QuestionTitle,
  InputContainer,
  StageContainer,
  FirstContainer,
} from "./MakeTripPage";
import splash from "../assets/images/splash.png";
import RightArrow from "../assets/images/RightArrow.png";

const ReplyRow = styled.div`
  display: flex;
  justify-content: center;
`;

const Replytext = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px;
`;
const Replycontent = styled.div`
  height: 60px;
  width: 60px;
  margin: 10px;
  border-radius: 20px;
  background-color: ${(props) => (props.isSelected ? "#50e293" : "#e2e2e2")};
  cursor: pointer;
`;
const ProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-left: 7%;
  margin-right: 7%;
  height: 200px;
  align-items: center;
`;
const Progress = styled.div`
  cursor: pointer;
  height: 10px;
  width: 27px;
  border-radius: 5px;
  background-color: ${(props) => (props.isGreen ? "#50e293" : "#E2E2E2")};
`;
const SubmitButton = styled.button`
  height: 50px;
  width: 86%;
  margin-left: 7%;
  margin-right: 7%;
  margin-top: 5%;
  border-radius: 20px;
  background-color: #e2e2e2;
  border: none;
  align-items: center;
`;

const CheckIconCircle = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  .checkIcon {
    width: 25px;
    height: 25px;
    background: ${(props) => {
        if (props.value === true) {
          return "green";
        } else if (props.value === false) {
          return "red";
        } else {
          return "#d3d3d3"; // light gray for null value
        }
      }}
      0% 0% no-repeat padding-box;
    border-radius: 50%;
    margin-left: 10px;
    margin-right: 10px;
    box-shadow: inset 0px 1px 3px #00000029;
    border-radius: 15px;
    color: white;
    opacity: 1;
  }
`;
const DropSet = styled.div`
  display: flex;
  justify-content: center;
`;
const AgeOption = styled.select`
  height: 35px;
  margin-left: 10%;

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
  margin-left: 20px;
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

function SignUpPage() {
  const [checkPW, setCheckPW] = useState(true);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isUsableEmail, SetIsUsableEmail] = useState();
  const [error, setErrorMsg] = useState("");
  const [selectedAge, setSelectedAge] = useState(10);
  const [selectedSex, setSelectedSex] = useState("MALE"); // Set the initial value as needed
  /*설문조사용*/

  const [selectedReply, setSelectedReply] = useState(null);

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
    age: 10,
    gender: "MALE",
    nickname: "",
    phoneNumber: "",
    shareLocation: false,
    preferCheapHotelThanComfort: 1,
    preferDayTrip: 1,
    preferDetailPlan: 1,
    preferGoodFood: 1,
    preferManyPhotos: 1,
    preferNatureThanCity: 1,
    preferNewCity: 1,
    preferTightSchedule: 3, //설문조사에는 없으나 백엔드에는 존재
  });
  const onNicknameHandler = (e) => {
    setData((prevData) => ({ ...prevData, nickname: e.target.value }));
  };
  const onEmailHandler = (e) => {
    setData((prevData) => ({ ...prevData, email: e.target.value }));
    setIsEmailChecked(false);
    setIsCheckingEmail(true);
  };

  useEffect(() => {
    let timer;

    const checkEmail = async () => {
      if (isCheckingEmail) {
        timer = setTimeout(async () => {
          try {
            const isDuplicate = await checkEmailAPI(data.email);
            // console.log(isDuplicate);
            setIsEmailChecked(true);
            setIsCheckingEmail(false);
            if (isDuplicate.data) {
              SetIsUsableEmail(false);
              setErrorMsg("이미 사용하고 있는 이메일입니다");
            } else {
              SetIsUsableEmail(true);
              setErrorMsg("");
            }
          } catch (error) {
            console.error("Error checking email:", error);
          }
        }, 1000);
      }
    };

    checkEmail();

    // Clear the timer if the user continues typing
    return () => clearTimeout(timer);
  }, [data.email, isCheckingEmail]);

  const onPasswordHandler = (e) => {
    setData((prevData) => ({ ...prevData, password: e.target.value }));
  };
  const onPWcheckHandler = (event) => {
    const confirmPassword = event.currentTarget.value;

    if (data.password !== "" && confirmPassword !== "") {
      if (data.password === confirmPassword) {
        setCheckPW(true);
      } else {
        setCheckPW(false);
      }
    } else {
      setCheckPW(false);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      const response = await signupAPI(data);
      if (response) {
        navigate("/landing");
      }
    } catch (error) {
      console.log("회원가입 오류발생");
    }
  };

  const AgeDropdown = () => {
    const onAgeHandler = (e) => {
      setSelectedAge(e.target.value);
      setData((prevData) => ({ ...prevData, age: e.target.value }));
    };

    const ageOptions = [
      { key: "19세 이하", value: 10 },
      { key: "20세 ~ 29세", value: 20 },
      { key: "30세 ~ 39세", value: 30 },
      { key: "40세 ~ 49세", value: 40 },
      { key: "50세 ~ 59세", value: 50 },
      { key: "60세 ~ 69세", value: 60 },
      { key: "70세 이상", value: 70 },
    ];

    return (
      <AgeOption value={selectedAge} onChange={onAgeHandler}>
        {ageOptions.map((ageOption) => (
          <option key={ageOption.key} value={ageOption.value}>
            {ageOption.key}
          </option>
        ))}
      </AgeOption>
    );
  };
  const SexDropdown = () => {
    const onGenderHandler = (e) => {
      setSelectedSex(e.target.value);
      setData((prevData) => ({ ...prevData, gender: e.target.value }));
    };

    const sexOptions = [
      { key: "남성", value: "MALE" },
      { key: "여성", value: "FEMALE" },
    ];

    return (
      <SexOption value={selectedSex} onChange={onGenderHandler}>
        {sexOptions.map((sexOption) => (
          <option key={sexOption.key} value={sexOption.value}>
            {sexOption.key}
          </option>
        ))}
      </SexOption>
    );
  };

  const [step, setStep] = useState(1);
  let currentStepComponent;
  const moveToNextStepButtonClick = () => {
    setSelectedReply(1);
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
            value={data.nickname}
            onChange={onNicknameHandler}
            placeholder="닉네임을 입력해주세요."
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
          <div style={{ display: "flex" }}>
            <InputContainer
              type="text"
              value={data.email}
              onChange={onEmailHandler}
              placeholder="이메일을 입력해주세요."
              required={true}
            />
            <CheckIconCircle value={isUsableEmail}>
              <BsCheck className="checkIcon" />
            </CheckIconCircle>
          </div>
          {error && (
            <div style={{ textAlign: "center", color: "red" }}>{error}</div>
          )}
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
            value={data.password}
            onChange={onPasswordHandler}
            placeholder="비밀번호를 입력해주세요."
            required={true}
          />
          <InputContainer
            type="password"
            onChange={onPWcheckHandler}
            placeholder="비밀번호를 입력해주세요."
            required={true}
          />
          {!checkPW && (
            <div
              style={{
                color: "red",
                marginTop: "5px",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              비밀번호가 일치하지 않습니다.
            </div>
          )}
        </StageContainer>
      );
      break;
    case 4:
      currentStepComponent = (
        <div>
          <TitleBold style={{ textAlign: "center", marginTop: "200px" }}>
            Q1.
          </TitleBold>
          <SubTitleMedium
            style={{
              textAlign: "center",
              height: "100px",
              padding: "10px",
            }}
          >
            휴가를 보낼 때, <br /> 자연 휴양지와 도시 중 <br /> 어디를 더
            선호하시나요?
          </SubTitleMedium>
          <ReplyRow>
            {Array(5)
              .fill()
              .map((_, index) => (
                <div>
                  <Replycontent
                    key={index + 1}
                    isSelected={selectedReply === index + 1}
                    onClick={() => {
                      setData((prevData) => ({
                        ...prevData,
                        preferNatureThanCity: index + 1,
                      }));
                      setSelectedReply(index + 1);
                    }}
                  />
                  {index == 0 && (
                    <Replytext>
                      <BodyBold12>자연 휴양지</BodyBold12>
                    </Replytext>
                  )}
                  {index == 4 && (
                    <Replytext>
                      <BodyBold12>도시</BodyBold12>
                    </Replytext>
                  )}
                </div>
              ))}
          </ReplyRow>

          <ProgressContainer>
            <Progress isGreen />
            <Progress />
            <Progress />
            <Progress />
            <Progress />
            <Progress />
            <Progress />
          </ProgressContainer>
        </div>
      );
      break;

    case 5:
      currentStepComponent = (
        <div>
          <TitleBold style={{ textAlign: "center", marginTop: "200px" }}>
            Q2.
          </TitleBold>
          <SubTitleMedium
            style={{
              textAlign: "center",
              height: "100px",
              padding: "10px",
            }}
          >
            한적하고 숨은 여행지와 <br /> 유명 핫 플레이스 중<br /> 꼭 가야 하는
            곳은 어디인가요?
          </SubTitleMedium>
          <ReplyRow>
            {Array(5)
              .fill()
              .map((_, index) => (
                <div>
                  <Replycontent
                    key={index + 1}
                    isSelected={selectedReply === index + 1}
                    onClick={() => {
                      setData((prevData) => ({
                        ...prevData,
                        preferNewCity: index + 1,
                      }));
                      setSelectedReply(index + 1);
                    }}
                  />
                  {index == 0 && (
                    <Replytext>
                      <BodyBold12>한적한 여행지</BodyBold12>
                    </Replytext>
                  )}
                  {index == 4 && (
                    <Replytext>
                      <BodyBold12>핫 플레이스</BodyBold12>
                    </Replytext>
                  )}
                </div>
              ))}
          </ReplyRow>

          <ProgressContainer>
            <Progress isGreen />
            <Progress isGreen />
            <Progress />
            <Progress />
            <Progress />
            <Progress />
            <Progress />
          </ProgressContainer>
        </div>
      );
      break;

    case 6:
      currentStepComponent = (
        <div>
          <TitleBold style={{ textAlign: "center", marginTop: "200px" }}>
            Q3.
          </TitleBold>
          <SubTitleMedium
            style={{ textAlign: "center", height: "100px", padding: "10px" }}
          >
            프리하고 계획 없는 여행과 <br /> 알찬 계획과 일정이 있는 여행 중{" "}
            <br /> 어느 스타일에 더 가까우신가요?
          </SubTitleMedium>
          <ReplyRow>
            {Array(5)
              .fill()
              .map((_, index) => (
                <div>
                  <Replycontent
                    key={index + 1}
                    isSelected={selectedReply === index + 1}
                    onClick={() => {
                      setData((prevData) => ({
                        ...prevData,
                        preferDetailPlan: index + 1,
                      }));
                      setSelectedReply(index + 1);
                    }}
                  />
                  {index == 0 && (
                    <Replytext>
                      <BodyBold12>프리스타일</BodyBold12>
                    </Replytext>
                  )}
                  {index == 4 && (
                    <Replytext>
                      <BodyBold12>알찬 계획</BodyBold12>
                    </Replytext>
                  )}
                </div>
              ))}
          </ReplyRow>

          <ProgressContainer>
            <Progress isGreen />
            <Progress isGreen />
            <Progress isGreen />
            <Progress />
            <Progress />
            <Progress />
            <Progress />
          </ProgressContainer>
        </div>
      );
      break;

    case 7:
      currentStepComponent = (
        <div>
          <TitleBold style={{ textAlign: "center", marginTop: "200px" }}>
            Q4.
          </TitleBold>
          <SubTitleMedium
            style={{ textAlign: "center", height: "100px", padding: "10px" }}
          >
            남는 건 사진 뿐!
            <br /> 사진보다 지금 현재가 중요하다! <br /> 어느 쪽에 동의하시나요?
          </SubTitleMedium>
          <ReplyRow>
            {Array(5)
              .fill()
              .map((_, index) => (
                <div>
                  <Replycontent
                    key={index + 1}
                    isSelected={selectedReply === index + 1}
                    onClick={() => {
                      setData((prevData) => ({
                        ...prevData,
                        preferManyPhotos: index + 1,
                      }));
                      setSelectedReply(index + 1);
                    }}
                  />
                  {index == 0 && (
                    <Replytext>
                      <BodyBold12>중요하지 않음</BodyBold12>
                    </Replytext>
                  )}
                  {index == 4 && (
                    <Replytext>
                      <BodyBold12>사진 촬영 필수</BodyBold12>
                    </Replytext>
                  )}
                </div>
              ))}
          </ReplyRow>

          <ProgressContainer>
            <Progress isGreen />
            <Progress isGreen />
            <Progress isGreen />
            <Progress isGreen />
            <Progress />
            <Progress />
            <Progress />
          </ProgressContainer>
        </div>
      );
      break;

    case 8:
      currentStepComponent = (
        <div>
          <TitleBold style={{ textAlign: "center", marginTop: "200px" }}>
            Q5.
          </TitleBold>
          <SubTitleMedium
            style={{ textAlign: "center", height: "100px", padding: "10px" }}
          >
            맛집 식도락 여행과 <br /> 맛집 상관없이 관광지 방문 중 <br /> 어느
            것이 더 끌리시나요?
          </SubTitleMedium>
          <ReplyRow>
            {Array(5)
              .fill()
              .map((_, index) => (
                <div>
                  <Replycontent
                    key={index + 1}
                    isSelected={selectedReply === index + 1}
                    onClick={() => {
                      setData((prevData) => ({
                        ...prevData,
                        preferGoodFood: index + 1,
                      }));
                      setSelectedReply(index + 1);
                    }}
                  />
                  {index == 0 && (
                    <Replytext>
                      <BodyBold12>관광지 방문</BodyBold12>
                    </Replytext>
                  )}
                  {index == 4 && (
                    <Replytext>
                      <BodyBold12>식도락 여행</BodyBold12>
                    </Replytext>
                  )}
                </div>
              ))}
          </ReplyRow>

          <ProgressContainer>
            <Progress isGreen />
            <Progress isGreen />
            <Progress isGreen />
            <Progress isGreen />
            <Progress isGreen />
            <Progress />
            <Progress />
          </ProgressContainer>
        </div>
      );
      break;

    case 9:
      currentStepComponent = (
        <div>
          <TitleBold style={{ textAlign: "center", marginTop: "200px" }}>
            Q6.
          </TitleBold>
          <SubTitleMedium
            style={{ textAlign: "center", height: "100px", padding: "10px" }}
          >
            당일치기 여행과 <br /> 여행 기간이 이틀 이상인 여행 중 <br /> 더
            가고 싶은 여행은 어느 쪽인가요?
          </SubTitleMedium>
          <ReplyRow>
            {Array(5)
              .fill()
              .map((_, index) => (
                <div>
                  <Replycontent
                    key={index + 1}
                    isSelected={selectedReply === index + 1}
                    onClick={() => {
                      setData((prevData) => ({
                        ...prevData,
                        preferDayTrip: index + 1,
                      }));
                      setSelectedReply(index + 1);
                    }}
                  />
                  {index == 0 && (
                    <Replytext>
                      <BodyBold12>당일치기</BodyBold12>
                    </Replytext>
                  )}
                  {index == 4 && (
                    <Replytext>
                      <BodyBold12>숙소는 필수</BodyBold12>
                    </Replytext>
                  )}
                </div>
              ))}
          </ReplyRow>

          <ProgressContainer>
            <Progress isGreen />
            <Progress isGreen />
            <Progress isGreen />
            <Progress isGreen />
            <Progress isGreen />
            <Progress isGreen />
            <Progress />
          </ProgressContainer>
        </div>
      );
      break;

    case 10:
      currentStepComponent = (
        <div>
          <TitleBold style={{ textAlign: "center", marginTop: "200px" }}>
            Q7.
          </TitleBold>
          <SubTitleMedium
            style={{ textAlign: "center", height: "100px", padding: "10px" }}
          >
            불편해도 가격이 저렴한 여행과 <br /> 가심비를 추구하는 편한 여행 중
            <br /> 어느 것을 더 선호하시나요?
          </SubTitleMedium>
          <ReplyRow>
            {Array(5)
              .fill()
              .map((_, index) => (
                <div>
                  <Replycontent
                    key={index + 1}
                    isSelected={selectedReply === index + 1}
                    onClick={() => {
                      setData((prevData) => ({
                        ...prevData,
                        preferCheapHotelThanComfort: index + 1,
                      }));
                      setSelectedReply(index + 1);
                    }}
                  />
                  {index == 0 && (
                    <Replytext>
                      <BodyBold12>가격 저렴</BodyBold12>
                    </Replytext>
                  )}
                  {index == 4 && (
                    <Replytext>
                      <BodyBold12>편한 여행</BodyBold12>
                    </Replytext>
                  )}
                </div>
              ))}
          </ReplyRow>

          <ProgressContainer>
            <Progress isGreen />
            <Progress isGreen />
            <Progress isGreen />
            <Progress isGreen />
            <Progress isGreen />
            <Progress isGreen />
            <Progress isGreen />
          </ProgressContainer>
        </div>
      );
      break;
    default:
      currentStepComponent = null;
  }

  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column" }}>
        {currentStepComponent}
        {step == 10 ? (
          <RightArrowButton>
            <RightArrowIcon src={RightArrow} onClick={onSubmitHandler} />
          </RightArrowButton>
        ) : (
          <RightArrowButton>
            <RightArrowIcon
              src={RightArrow}
              onClick={moveToNextStepButtonClick}
            />
          </RightArrowButton>
        )}
      </form>
    </div>
  );
}

export default SignUpPage;
