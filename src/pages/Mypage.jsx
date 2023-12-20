import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import sample from "../assets/images/sample.png";
import {
  TitleBold,
  SubTitleMedium,
  BodyMedium15,
  BodyMedium12,
  BodyBold15,
  BodyBold12,
} from "./fonts.js";
import axios from "axios";
import docu1 from "../assets/images/docu1.png";
import docu2 from "../assets/images/docu2.png";
import postbox from "../assets/images/postbox.png";
import oneonone from "../assets/images/oneonone.png";
import version from "../assets/images/version.png";
const Imageset = styled.img`
  margin-left: 5%;
`;
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: white;
  box-shadow: 0px 2px 5px 0px #00000040;
  color: black;
  height: 70px;
  text-align: center;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  font-family: KoPubWorldDotum;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: -0.5px;
  line-height: 30px;
`;

const MypageContainer = styled.div`
  background-color: white;
  padding-bottom 60px;
  z-index: 1;
  position: relative;
`;

const MyInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
`;

const ProfilImageContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  background: #ccc;
`;
const CircularImageElement = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const OperatingContainer = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 5px 0px #00000040;
  border-radius: 20px;
  margin: 10px;
  height: 50px;
  display: flex;
  justify-content: flex-start;896
  align-items: center;
  gap: 7%;
`;

const ProfileButton = styled.button``;

const Mypage = () => {
  const navigate = useNavigate();
  const handleProfileButtonClick = () => {
    navigate("/myprofile", { state: { information: myinfo } });
  };
  const [myinfo, setMyinfo] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:80/member/myinfo", {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMkBnbWFpbC5jb20iLCJhdXRoIjoiVVNFUiIsImV4cCI6MTcwMzE0NDM4N30.MWRiS8ixj5yRg8-ayydUQgUImnrA9_HRFYJik4iZ8fUHPDDhySEqw0K-NUR_1__I2jXuev7UZC6fWCom_U4uoQ",
          },
        });

        setMyinfo(response.data.data);
        console.log(response.data.data);
        console.log(myinfo);
      } catch (error) {
        console.error("Error fetching trip data:", error);
      }
    };

    fetchData();
  }, []);

  const initialnickname = "맑눈광";
  const initialintroduction =
    "젊은 패기로 신속 정확하게 팩트를 전달한다 안녕하세요 인턴기자 주.현.영입니다. 질문 하나 드려도 될까요?";

  return (
    <MypageContainer>
      <HeaderContainer>마이페이지</HeaderContainer>
      <MyInformationContainer>
        <ProfilImageContainer>
          <CircularImageElement src={sample} alt="Circular" />
        </ProfilImageContainer>
        <TitleBold style={{ textAlign: "center" }}>{myinfo.nickname}</TitleBold>
        <BodyMedium12 style={{ textAlign: "center" }}>
          {myinfo.introduction}
        </BodyMedium12>
        <BodyBold12
          style={{ textAlign: "center", color: "#999999" }}
          onClick={handleProfileButtonClick}
        >
          상세 보기
        </BodyBold12>
      </MyInformationContainer>

      <OperatingContainer>
        <Imageset src={postbox} />
        <SubTitleMedium>내 쪽지함</SubTitleMedium>
      </OperatingContainer>
      <OperatingContainer>
        <Imageset src={oneonone} />
        <SubTitleMedium>1:1 문의 남기기</SubTitleMedium>
      </OperatingContainer>
      <OperatingContainer>
        <Imageset src={docu1} />
        <SubTitleMedium>개인정보처리방침</SubTitleMedium>
      </OperatingContainer>
      <OperatingContainer>
        <Imageset src={docu2} />
        <SubTitleMedium>이용약관</SubTitleMedium>
      </OperatingContainer>
      <OperatingContainer>
        <Imageset src={version} />
        <SubTitleMedium>버전정보</SubTitleMedium>
      </OperatingContainer>
    </MypageContainer>
  );
};

export default Mypage;
