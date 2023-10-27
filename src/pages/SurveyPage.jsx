import React, { useState } from "react";
import "../SurveyPage.css";
import styled from "styled-components";
/*import "./fonts/Font.css";*/
const SurveyContainer = styled.div`
  padding: 20px 20px 20px 20px;
  background-color: rgb(41, 194, 156);
`;
const QuestionContainer = styled.div`
  margin: 20px 0;
  padding: 20px;
  background-color: #fff;
  border: 2px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;
const SelectButton = styled.div`
  padding-left: 2%;
  padding-top: 2%;
  padding-bottom: 2%;
  height: 10%;
  background-color: #e8e9e5;
  color: #6a6b6a;
  border: none;
  border-radius: 5px;
  font-family: "NotoSansKR";
  min-height: 30px;
  min-width: 120px;
`;

function SurveyPage() {
  const themes = [
    "목적지 스타일",
    "목적지 스타일",
    "즐기는 스타일",
    "즐기는 스타일",
    "즐기는 스타일",
    "즐기는 스타일",
    "숙박",
    "숙박",
  ];

  const questions = [
    "자연 휴양지에 가깝다면 1, 도시에 가깝다면 5",
    "한적한 숨은 여행지에 가깝다면 1, 유명 핫 플레이스에 가깝다면 5",
    "무계획 여행은 1, 무계획적인 여행은 1",
    "타이트한 일정으로 알차게 여행에 가깝다면 1, 여유있는 여행에 가깝다면 5",
    "사진 촬영 안 중요하면 1, 사진 촬영 중요하면 5",
    "맛집 딱히 상관없다면 1, 맛집 식도락 여행하고 싶으면 5",
    "당일치기 여행에 가깝다면 1, 숙소 필수라면 5",
    "불편해도 싸면 장땡 1 비싸도 편하길 원하면 5",
    // 다른 질문들을 여기에 추가
  ];
  const answerKeys = [
    "preferNatureThanCity",
    "preferNewCity",
    "preferDetailPlan",
    "preferTightSchedule",
    "preferManyPhotos",
    "preferGoodFood",
    "preferDayTrip",
    "preferCheapHotelThanComfort",
  ];
  const answerOptions = [
    ["1", "2", "3", "4", "5"],
    ["1", "2", "3", "4", "5"],
    ["1", "2", "3", "4", "5"],
    ["1", "2", "3", "4", "5"],
    ["1", "2", "3", "4", "5"],
    ["1", "2", "3", "4", "5"],
    ["1", "2", "3", "4", "5"],
    ["1", "2", "3", "4", "5"],
    // 다른 질문에 대한 선택지 배열을 추가
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentTheme, setCurrentTheme] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentAnswerKey, setCurrentAnswerKey] = useState(0);

  const handleNextQuestion = (question, answer) => {
    const answerObject = { [question]: answer };
    setAnswers([...answers, answerObject]);
    if (currentQuestion <= questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentTheme(currentTheme + 1);
      setCurrentAnswerKey(currentAnswerKey + 1);
    } else {
      console.log("수고요");
    }
  };

  console.log(answers);

  return (
    <SurveyContainer>
      <p className="survey-title">#{themes[currentTheme]}</p>

      {currentQuestion < questions.length ? (
        <QuestionContainer>
          <p className="question">{questions[currentQuestion]}</p>
          <div className="answer-options">
            {answerOptions[currentQuestion].map((option, index) => (
              <label key={index}>
                <SelectButton
                  key={index}
                  onClick={() =>
                    handleNextQuestion(answerKeys[currentAnswerKey], option)
                  }
                >
                  {option}
                </SelectButton>
              </label>
            ))}
          </div>
        </QuestionContainer>
      ) : (
        <p className="completeSurvey">수고하셨습니다!</p>
      )}
    </SurveyContainer>
  );
}

export default SurveyPage;
