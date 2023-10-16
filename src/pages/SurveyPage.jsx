import React, { useState } from "react";
import "../SurveyPage.css";
import styled from "styled-components";
/*import "./fonts/Font.css";*/
const SurveyContainer = styled.div`
  padding: 20px 20px 20px 20px;
  background-color: #29c29c;
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
    "목적지",
    "목적지",
    "즐기는 스타일",
    "즐기는 스타일",
    "즐기는 스타일",
    "즐기는 스타일",
    "숙박",
    "숙박",
  ];

  const questions = [
    "자연 휴양지와 도시 중에 어디에 더 가고 싶어요?",
    "유명하지 않더라도 소소한 매력이 있는 곳과 유명한 핫 플레이스 중에 어디가 더 좋나요?",
    "계획에 따른 여행과 무계획 여행 중 어떤 것을 선호하나요?",
    "타이트한 일정으로 알찬 여행, 여유있는 여행 어떤 게 더 좋아요?",
    "사진 촬영 중요하다? 안 중요하다?",
    "현지 맛집 찾아다니는 스타일? 아니면 먹는 건 아무거나 상관없다?",
    "당일치기 여행이 좋아요? 아니면 여행지 근처에서 숙박할까요?",
    "편하지만 비싼 숙소가 좋을까요? 아니면 불편하더라도 저렴한 숙소가 좋을까요?",
    // 다른 질문들을 여기에 추가
  ];

  const answerOptions = [
    ["휴양지", "도시"],
    ["알려지지 않은 방문지", "유명한 방문지"],
    ["계획에 따른 여행", "무계획 여행"],
    ["타이트하고 알찬 일정", "여유로운 일정"],
    ["사진은 필수지", "사진 촬영 안해도 된다"],
    ["맛집 도장깨기 필수", "먹기만 하면 되지 뭐"],
    ["여행지는 그저 여행지일 뿐, 당일치기", "여행지에서 자고 갈래"],
    ["편하다면 비싸도 돼", "불편하지만 저렴한 숙소"],
    // 다른 질문에 대한 선택지 배열을 추가
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentTheme, setCurrentTheme] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleNextQuestion = (answer) => {
    setAnswers([...answers, answer]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentTheme(currentTheme + 1);
    }
  };

  console.log(answers);

  return (
    <SurveyContainer>
      <p className="survey-title">#{themes[currentTheme]}</p>

      <QuestionContainer>
        <p className="question">{questions[currentQuestion]}</p>
        <div className="answer-options">
          {answerOptions[currentQuestion].map((option, index) => (
            <label key={index}>
              <SelectButton
                key={index}
                onClick={() => handleNextQuestion(option)}
              >
                {option}
              </SelectButton>
            </label>
          ))}
        </div>
      </QuestionContainer>
    </SurveyContainer>
  );
}

export default SurveyPage;
