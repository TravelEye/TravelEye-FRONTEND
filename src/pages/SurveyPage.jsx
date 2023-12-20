import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  TitleBold,
  SubTitleMedium,
  BodyMedium15,
  BodyMedium12,
  BodyBold15,
  BodyBold12,
} from "./fonts.js";
import RightArrow from "../assets/images/RightArrow.png";
import RightArrow_active from "../assets/images/RightArrow_active.png";

const RightArrowButton = styled.div`
  position: absolute;
  bottom: 80px;
  right: 40px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #50e293;
  border-radius: 50%;
`;
const RightArrowIcon = styled.img`
  width: 65%;
  height: 65%;
  border-radius: 50%;
`;

const SurveyContainer = styled.div`
  background-color: white;
  //display: flex;
  //flex-direction: column;
  //align-items: center;
`;
const QuestionContainer = styled.div`
  margin-top: 45%;
  display: flex;
  flex-direction: column;
`;

const ReplyRow = styled.div`
  display: flex;
  justify-content: spacebetween;
`;

const Replytext = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Replycontent = styled.div`
  height: 60px;
  width: 15%;
  border-radius: 20px;
  background-color: ${(props) => (props.isSelected ? "#50e293" : "#e2e2e2")};
  cursor: pointer;
`;
const ProgressContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 7%;
  margin-right: 7%;
`;
const Progress = styled.div`
  height: 10px;
  width: 8%;
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

const SurveyPage = () => {
  const [surveystep, setSurveyStep] = useState(1);
  const [selectedReply, setSelectedReply] = useState(null);
  const [surveyresponse, setSurveyresponse] = useState({});
  const [arrowImage, setArrowImage] = useState(RightArrow);

  const handleReplyClick = (index) => {
    setSelectedReply(index);
    setSurveyresponse({ ...surveyresponse, [surveystep]: index });
    setArrowImage(RightArrow_active);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(surveyresponse);
  };

  const navigate = useNavigate();
  const moveToNextStepButtonClick = () => {
    setSurveyStep((prevStep) => prevStep + 1);
    setSelectedReply(null);
    setArrowImage(RightArrow);
  };

  let currentSurveyComponent;

  switch (surveystep) {
    case 0:

    case 1:
      currentSurveyComponent = (
        <form onSubmit={handleFormSubmit}>
          <QuestionContainer>
            <TitleBold style={{ textAlign: "center" }}>Q1.</TitleBold>
            <SubTitleMedium style={{ textAlign: "center" }}>
              휴가를 보낼 때, <br /> 자연 휴양지와 도시 중 <br /> 어디를 더
              선호하시나요?
            </SubTitleMedium>
            <ReplyRow>
              {Array(5)
                .fill()
                .map((_, index) => (
                  <Replycontent
                    key={index}
                    isSelected={selectedReply === index}
                    onClick={() => handleReplyClick(index)}
                  />
                ))}
            </ReplyRow>
            <Replytext>
              <BodyBold12>자연 휴양지</BodyBold12>
              <BodyBold12>도시</BodyBold12>
            </Replytext>
          </QuestionContainer>
          <ProgressContainer>
            <Progress isGreen />
            <Progress />
            <Progress />
            <Progress />
            <Progress />
            <Progress />
            <Progress />
          </ProgressContainer>
          <SubmitButton type="submit">
            <BodyBold15 style={{ textAlign: "center" }}>제출하기</BodyBold15>
          </SubmitButton>
        </form>
      );
      break;

    case 2:
      currentSurveyComponent = (
        <form onSubmit={handleFormSubmit}>
          <QuestionContainer>
            <TitleBold style={{ textAlign: "center" }}>Q2.</TitleBold>
            <SubTitleMedium style={{ textAlign: "center" }}>
              한적하고 숨은 여행지와 <br /> 유명 핫 플레이스 중<br /> 꼭 가야
              하는 곳은 어디인가요?
            </SubTitleMedium>
            <ReplyRow>
              {Array(5)
                .fill()
                .map((_, index) => (
                  <Replycontent
                    key={index}
                    isSelected={selectedReply === index}
                    onClick={() => handleReplyClick(index)}
                  />
                ))}
            </ReplyRow>
            <Replytext>
              <BodyBold12>한적한 여행지</BodyBold12>
              <BodyBold12>핫 플레이스</BodyBold12>
            </Replytext>
          </QuestionContainer>
          <ProgressContainer>
            <Progress isGreen />
            <Progress isGreen />
            <Progress />
            <Progress />
            <Progress />
            <Progress />
            <Progress />
          </ProgressContainer>
          <SubmitButton type="submit">
            <BodyBold15 style={{ textAlign: "center" }}>제출하기</BodyBold15>
          </SubmitButton>
        </form>
      );
      break;

    case 3:
      currentSurveyComponent = (
        <form onSubmit={handleFormSubmit}>
          <QuestionContainer>
            <TitleBold style={{ textAlign: "center" }}>Q3.</TitleBold>
            <SubTitleMedium style={{ textAlign: "center" }}>
              프리하고 계획 없는 여행과 <br /> 알찬 계획과 일정이 있는 여행 중{" "}
              <br /> 어느 스타일에 더 가까우신가요?
            </SubTitleMedium>
            <ReplyRow>
              {Array(5)
                .fill()
                .map((_, index) => (
                  <Replycontent
                    key={index}
                    isSelected={selectedReply === index}
                    onClick={() => handleReplyClick(index)}
                  />
                ))}
            </ReplyRow>
            <Replytext>
              <BodyBold12>프리스타일</BodyBold12>
              <BodyBold12>알찬 계획</BodyBold12>
            </Replytext>
          </QuestionContainer>
          <ProgressContainer>
            <Progress isGreen />
            <Progress isGreen />
            <Progress isGreen />
            <Progress />
            <Progress />
            <Progress />
            <Progress />
          </ProgressContainer>
          <SubmitButton type="submit">
            <BodyBold15 style={{ textAlign: "center" }}>제출하기</BodyBold15>
          </SubmitButton>
        </form>
      );
      break;

    case 4:
      currentSurveyComponent = (
        <form onSubmit={handleFormSubmit}>
          <QuestionContainer>
            <TitleBold style={{ textAlign: "center" }}>Q4.</TitleBold>
            <SubTitleMedium style={{ textAlign: "center" }}>
              남는 건 사진 뿐!
              <br /> 사진보다 지금 현재가 중요하다! <br /> 어느 쪽에
              동의하시나요?
            </SubTitleMedium>
            <ReplyRow>
              {Array(5)
                .fill()
                .map((_, index) => (
                  <Replycontent
                    key={index}
                    isSelected={selectedReply === index}
                    onClick={() => handleReplyClick(index)}
                  />
                ))}
            </ReplyRow>
            <Replytext>
              <BodyBold12>별로 중요하지 않음</BodyBold12>
              <BodyBold12>사진 촬영 필수</BodyBold12>
            </Replytext>
          </QuestionContainer>
          <ProgressContainer>
            <Progress isGreen />
            <Progress isGreen />
            <Progress isGreen />
            <Progress isGreen />
            <Progress />
            <Progress />
            <Progress />
          </ProgressContainer>
          <SubmitButton type="submit">
            <BodyBold15 style={{ textAlign: "center" }}>제출하기</BodyBold15>
          </SubmitButton>
        </form>
      );
      break;

    case 5:
      currentSurveyComponent = (
        <form onSubmit={handleFormSubmit}>
          <QuestionContainer>
            <TitleBold style={{ textAlign: "center" }}>Q5.</TitleBold>
            <SubTitleMedium style={{ textAlign: "center" }}>
              맛집 식도락 여행과 <br /> 맛집 상관없이 관광지 방문 중 <br /> 어느
              것이 더 끌리시나요?
            </SubTitleMedium>
            <ReplyRow>
              {Array(5)
                .fill()
                .map((_, index) => (
                  <Replycontent
                    key={index}
                    isSelected={selectedReply === index}
                    onClick={() => handleReplyClick(index)}
                  />
                ))}
            </ReplyRow>
            <Replytext>
              <BodyBold12>관광지 방문</BodyBold12>
              <BodyBold12>식도락 여행</BodyBold12>
            </Replytext>
          </QuestionContainer>
          <ProgressContainer>
            <Progress isGreen />
            <Progress isGreen />
            <Progress isGreen />
            <Progress isGreen />
            <Progress isGreen />
            <Progress />
            <Progress />
          </ProgressContainer>
          <SubmitButton type="submit">
            <BodyBold15 style={{ textAlign: "center" }}>제출하기</BodyBold15>
          </SubmitButton>
        </form>
      );
      break;

    case 6:
      currentSurveyComponent = (
        <form onSubmit={handleFormSubmit}>
          <QuestionContainer>
            <TitleBold style={{ textAlign: "center" }}>Q6.</TitleBold>
            <SubTitleMedium style={{ textAlign: "center" }}>
              당일치기 여행과 <br /> 여행 기간이 이틀 이상인 여행 중 <br /> 더
              가고 싶은 여행은 어느 쪽인가요?
            </SubTitleMedium>
            <ReplyRow>
              {Array(5)
                .fill()
                .map((_, index) => (
                  <Replycontent
                    key={index}
                    isSelected={selectedReply === index}
                    onClick={() => handleReplyClick(index)}
                  />
                ))}
            </ReplyRow>
            <Replytext>
              <BodyBold12>당일치기</BodyBold12>
              <BodyBold12>숙소는 필수</BodyBold12>
            </Replytext>
          </QuestionContainer>
          <ProgressContainer>
            <Progress isGreen />
            <Progress isGreen />
            <Progress isGreen />
            <Progress isGreen />
            <Progress isGreen />
            <Progress isGreen />
            <Progress />
          </ProgressContainer>
          <SubmitButton type="submit">
            <BodyBold15 style={{ textAlign: "center" }}>제출하기</BodyBold15>
          </SubmitButton>
        </form>
      );
      break;

    case 7:
      currentSurveyComponent = (
        <form onSubmit={handleFormSubmit}>
          <QuestionContainer>
            <TitleBold style={{ textAlign: "center" }}>Q7.</TitleBold>
            <SubTitleMedium style={{ textAlign: "center" }}>
              불편해도 가격이 저렴한 여행과 <br /> 가심비를 추구하는 편한 여행
              중<br /> 어느 것을 더 선호하시나요? ={" "}
            </SubTitleMedium>
            <ReplyRow>
              {Array(5)
                .fill()
                .map((_, index) => (
                  <Replycontent
                    key={index}
                    isSelected={selectedReply === index}
                    onClick={() => handleReplyClick(index)}
                  />
                ))}
            </ReplyRow>
            <Replytext>
              <BodyBold12>가격 저렴</BodyBold12>
              <BodyBold12>편한 여행</BodyBold12>
            </Replytext>
          </QuestionContainer>
          <ProgressContainer>
            <Progress isGreen />
            <Progress isGreen />
            <Progress isGreen />
            <Progress isGreen />
            <Progress isGreen />
            <Progress isGreen />
            <Progress isGreen />
          </ProgressContainer>
          <SubmitButton type="submit">
            <BodyBold15 style={{ textAlign: "center" }}>제출하기</BodyBold15>
          </SubmitButton>
        </form>
      );
      break;

    default:
      currentSurveyComponent = null;
  }

  return (
    <SurveyContainer>
      {currentSurveyComponent}
      <RightArrowButton>
        <RightArrowIcon src={arrowImage} onClick={moveToNextStepButtonClick} />
      </RightArrowButton>
    </SurveyContainer>
  );
};

export default SurveyPage;
