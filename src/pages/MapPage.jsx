import React, { useState, useEffect } from "react";
import MapRestaurant from "./MapRestaurant";
import MapPartner from "./MapPartner";
import styled from "styled-components";
import NavermyMap from "./NaverMap";
import NavermyMapRestaurant from "./NaverMapRestaurant";
import axios from "axios";
import Partner_active from "../assets/images/Partner_active.png";
import Partner_unactive from "../assets/images/Partner_unactive.png";
import Restaurant_active from "../assets/images/Restaurant_active.png";
import Restaurant_unactive from "../assets/images/Restaurant_unactive.png";
import { Button } from "@material-ui/core";
import { useTripContext } from "./TripContext";

const AdContainer = styled.div`
  position: relative;
  height: 100%;
`;

const MapContainer = styled.div`
  height: 93vh;
  position: relative;
  padding-bottom: 60px;
  background-color: white;
  overflow: hidden;
`;
const ButtonContainer = styled.div`
  position: absolute;
  top: 6%;
  right: 3%;
  display: flex;
  flex-direction: column;
  z-index: 2;
`;

const LandmarkSet = [
  {
    id: 1,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "만장굴",
    latitude: "33.489011",
    longitude: "126.498302",
    address: "123 제주대로",
  },
  {
    id: 2,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "성산일출봉",
    latitude: "33.458366",
    longitude: "126.942906",
    address: "456 제주해안로",
  },
  {
    id: 3,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "평화의 소녀상",
    latitude: "33.489868",
    longitude: "126.481713",
    address: "789 갈치로",
  },
  {
    id: 4,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "용두암",
    latitude: "33.516178",
    longitude: "126.525971",
    address: "101 도령로",
  },
  {
    id: 5,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "한라산",
    latitude: "33.361403",
    longitude: "126.529211",
    address: "202 한라로",
  },
  {
    id: 6,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "오설록 티 뮤지엄",
    latitude: "33.306987",
    longitude: "126.392786",
    address: "303 효돈로",
  },
  {
    id: 7,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "제주 돌문화 공원",
    latitude: "33.447898",
    longitude: "126.558453",
    address: "404 토산로",
  },
  {
    id: 8,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "마라도 해양도서관",
    latitude: "33.290348",
    longitude: "126.297408",
    address: "505 도남로",
  },
  {
    id: 9,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "천지연 폭포",
    latitude: "33.510936",
    longitude: "126.527529",
    address: "606 삼무로",
  },
  {
    id: 10,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "올레길 7코스",
    latitude: "33.362346",
    longitude: "126.531989",
    address: "707 제주로",
  },
  {
    id: 11,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "한담동 선인장마을",
    latitude: "33.497788",
    longitude: "126.516836",
    address: "808 선인장로",
  },
  {
    id: 12,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "사려니숲길",
    latitude: "33.454984",
    longitude: "126.728761",
    address: "909 사려니로",
  },
  {
    id: 13,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "제주민속촌",
    latitude: "33.436091",
    longitude: "126.305229",
    address: "1010 돌하르방로",
  },
  {
    id: 14,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "이중섭 거리",
    latitude: "33.513095",
    longitude: "126.527222",
    address: "1111 이중섭로",
  },
  {
    id: 15,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "제주항",
    latitude: "33.514062",
    longitude: "126.523163",
    address: "1212 일주동로",
  },
  {
    id: 16,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "헌릉로",
    latitude: "33.483204",
    longitude: "126.476785",
    address: "1313 헌릉로",
  },
  {
    id: 17,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "올레길 6코스",
    latitude: "33.411399",
    longitude: "126.270282",
    address: "1414 제주로",
  },
  {
    id: 18,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "서귀포 동문시장",
    latitude: "33.246563",
    longitude: "126.509795",
    address: "1515 서문로",
  },
  {
    id: 19,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "산방산",
    latitude: "33.350481",
    longitude: "126.818004",
    address: "1616 산방로",
  },
  {
    id: 20,
    continent: "아시아",
    country: "대한민국",
    province: "제주도",
    city: "제주시",
    title: "송악산",
    latitude: "33.328504",
    longitude: "126.749515",
    address: "1717 송악로",
  },
];
const MapPage = () => {
  const accessToken = localStorage.getItem("accessToken");
  const { updatedTripData } = useTripContext();
  console.log(updatedTripData);
  const [isRestaurantMode, setRestaurantMode] = useState(true);
  const [isPartnerMode, setPartnerMode] = useState(false);

  const handleRestaurantMode = () => {
    setRestaurantMode(true);
    setPartnerMode(false);
  };

  const handlePartnerMode = () => {
    setRestaurantMode(false);
    setPartnerMode(true);
  };
  const [trips, setTrips] = useState([]);
  const [tripSet, setTripSet] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:80/trip/all", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const updatedTripSet = response.data.data.map((trip) => {
          const tripLandmarks = trip.memos.map((memo) => {
            const landmarkId = memo.landmarkId;
            const landmarkInfo = LandmarkSet.find(
              (landmark) => landmark.id === landmarkId
            );

            return {
              landmarkId,
              ...landmarkInfo,
            };
          });

          return {
            id: trip.id,
            landmarks: tripLandmarks,
          };
        });

        setTripSet(updatedTripSet);
        console.log(updatedTripSet);
      } catch (error) {
        console.error("Error fetching trip data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <MapContainer>
      <ButtonContainer>
        <img
          src={isPartnerMode === true ? Partner_active : Partner_unactive}
          onClick={handlePartnerMode}
          style={{ width: "60px", height: "60px" }}
        />
        <img
          src={
            isRestaurantMode === true ? Restaurant_active : Restaurant_unactive
          }
          onClick={handleRestaurantMode}
          style={{ width: "60px", height: "60px" }}
        />
      </ButtonContainer>
      <AdContainer>
        {isPartnerMode ? <NavermyMap /> : null}
        {isRestaurantMode ? <NavermyMapRestaurant /> : null}
      </AdContainer>
    </MapContainer>
  );
};

export default MapPage;
