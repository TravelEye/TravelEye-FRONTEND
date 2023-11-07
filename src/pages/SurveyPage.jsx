import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentTheme, setCurrentTheme] = useState(0);
  const [showSubmit, setShowSubmit] = useState(false); // 상태 추가
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState({});
  const [currentAnswerKey, setCurrentAnswerKey] = useState(0);
  const navigate = useNavigate();

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
  ];

  const handleNextQuestion = (question, answer) => {
    const updatedAnswers = { ...answers, [question]: parseInt(answer, 10) };
    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentTheme(currentTheme + 1);
      setCurrentAnswerKey(currentAnswerKey + 1);
    } else if (currentQuestion === questions.length - 1) {
      setShowSubmit(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // 폼 기본 동작 막아주는 거

    const answersJSON = JSON.stringify(answers); // JSON으로 변환

    console.log(answersJSON);
    setShowResults(true);
    setTimeout(() => {
      navigate("/map");
    }, 3000);
  };

  return (
    <SurveyContainer>
      {showResults ? (
        <div>
          <p className="completeSurvey">수고하셨습니다!</p>
        </div>
      ) : (
        <form>
          <p className="survey-title">#{themes[currentTheme]}</p>
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
          {showSubmit && ( //showSubmit은 마지막 질문의 선택지가 눌리면 -> hadleNextQuestion 동작 -> 그때서야 true가 됨. (= 제출 버튼 생성)
            <button type="submit" onClick={handleSubmit}>
              제출
            </button>
            // 버튼 눌리면 -> handleSubmit -> setShowResults가 true가 되면서 -> 설문조사 완료했다는 페이지, 혹은 렌더링 페이지로 넘어가면 될듯
          )}
        </form>
      )}
    </SurveyContainer>
  );
}

export default SurveyPage;

/*const handleSubmit = (event) => {
  event.preventDefault(); // 폼의 기본 동작 방지

  // answers를 JSON 형식으로 변환
  const answersJSON = JSON.stringify(answers);

  fetch('/survey', { // 서버의 URL로 바꾸세요
    method: 'POST', // POST 메서드를 사용
    headers: {
      'Content-Type': 'application/json', // JSON 데이터를 보낸다고 명시
    },
    body: answersJSON, // JSON 형식의 데이터를 요청 본문에 넣음
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log('서버로부터 응답 받음:', data);
      setShowResults(true); // 서버로부터 응답을 성공적으로 받았을 때 결과를 표시
    })
    .catch((error) => {
      console.error('오류:', error);
    });
};*/
