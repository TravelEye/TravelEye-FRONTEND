import React, { useEffect, useState } from "react";
import addr_person from "../assets/images/addr_person.png";
import { act } from "react-dom/test-utils";
import styled from "styled-components";
import {
  TitleBold,
  SubTitleMedium,
  BodyMedium15,
  BodyMedium12,
  BodyBold15,
  BodyBold12,
} from "./fonts.js";
import sample from "../assets/images/sample.png";

const TripControlButtonContainer = styled.div`
  position: absolute;
  top: 5%;
  left: 10%;
  display: flex;
  gap: 10px;
  width: 100%;
`;
const TripControlButton = styled.button`
  background-color: #50e093;
  z-index: 2;
  border: none;

  box-shadow: 0px 2px 5px 0px #00000040;
`;
const BottomSheet = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0px 0px 5px 0px #00000040;
  width: 100%;
  background-color: white;
  bordertop: 1px solid #ccc;
  z-index: 2;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

const BottomSheetBar = styled.div`
  width: 20%;
  height: 5px;
  background-color: #999999;
  margin-top: 10px;
  flex-shrink: 0;
`;

const BottomSheetContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 15px;
`;

const BottomSheetTextLine1 = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px, 5px, 0px, 5px;
`;
const BottomSheetTextLine2 = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BottomSheetText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;
const SimilarityContainer = styled.div`
  width: 100%;
  height: 20px;
  background-color: white;
  border: 1px solid #50e293;
  border-radius: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: 5%;
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

const NavermyMap = () => {
  const [partnerMarkers, setPartnerMarkers] = useState([]);
  const [activePlan, setActivePlan] = useState(0);
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(true);
  const [bottomSheetHeight, setBottomSheetHeight] = useState("10%"); // 추가된 부분
  const [viewPartners, setViewPartners] = useState([]);

  const toggleBottomSheet = () => {
    setBottomSheetOpen(!isBottomSheetOpen);

    setBottomSheetHeight(!isBottomSheetOpen ? "10%" : "60%");
    console.log(bottomSheetHeight);
  };

  const plans = [
    [
      { name: "용두암", lat: 33.516213, lng: 126.512063, type: "landmark" },
      {
        name: "제주시민속오일시장",
        lat: 33.496799,
        lng: 126.475579,
        type: "landmark",
      },
      {
        name: "한라수목원",
        lat: 33.469857,
        lng: 126.493385,
        type: "landmark",
      },
    ],
    [
      {
        name: "안목해변",
        lat: 37.773125,
        lng: 128.948048,
        type: "landmark",
      },
      {
        name: "사천해변 서핑샵",
        lat: 37.82954,
        lng: 128.877296,
        type: "landmark",
      },
      {
        name: "아르떼 강릉",
        lat: 37.791665,
        lng: 128.907258,
        type: "landmark",
      },
    ],
  ];
  const plan_partners = [
    [
      [
        {
          name: "Juliette",
          planname: "용두암",
          character: 90,
          plan: 49,
          temperature: 99,
          lat: 33.512949,
          lng: 126.508212,
        },
        {
          name: "Lara",
          planname: "용두암",
          character: 90,
          plan: 49,
          temperature: 54,
          lat: 33.514918,
          lng: 126.507841,
        },
        {
          name: "Philip",
          planname: "용두암",
          character: 90,
          plan: 49,
          temperature: 87,
          lat: 33.509306,
          lng: 126.512499,
        },
      ],
      [
        {
          name: "Anna",
          planname: "제주시민속오일시장",
          character: 90,
          plan: 49,
          temperature: 54,
          lat: 33.491201,
          lng: 126.475785,
        },
        {
          name: "Elsa",
          planname: "제주시민속오일시장",
          character: 90,
          plan: 49,
          temperature: 54,
          lat: 33.4901201,
          lng: 126.455785,
        },
      ],
      [
        {
          name: "Christoph",
          planname: "한라수목원",
          character: 90,
          plan: 49,
          temperature: 54,
          lat: 33.466398,
          lng: 126.487622,
        },
        {
          name: "Hellen",
          planname: "한라수목원",
          character: 90,
          plan: 49,
          temperature: 54,
          lat: 33.4646398,
          lng: 126.4827622,
        },
        {
          name: "Nikola",
          planname: "한라수목원",
          character: 90,
          plan: 49,
          temperature: 54,
          lat: 33.46298,
          lng: 126.4827622,
        },
        {
          name: "Elizabeth",
          planname: "한라수목원",
          character: 90,
          plan: 49,
          temperature: 54,
          lat: 33.4656398,
          lng: 126.4837622,
        },
        {
          name: "Kaiser",
          planname: "한라수목원",
          character: 90,
          plan: 49,
          temperature: 54,
          lat: 33.4636398,
          lng: 126.4877622,
        },
      ],
    ],
    [
      [
        {
          name: "Juliette",
          planname: "안목해변",
          character: 90,
          plan: 49,
          temperature: 99,
          lat: 37.77,
          lng: 128.94,
        },
        {
          name: "Lara",
          planname: "안목해변",
          character: 90,
          plan: 49,
          temperature: 54,
          lat: 37.775,
          lng: 128.945,
        },
        {
          name: "Philip",
          planname: "안목해변",
          character: 90,
          plan: 49,
          temperature: 87,
          lat: 37.78,
          lng: 128.95,
        },
      ],
      [
        {
          name: "Anna",
          planname: "사천해변 서핑샵",
          character: 90,
          plan: 49,
          temperature: 54,
          lat: 37.83,
          lng: 128.86,
        },
        {
          name: "Elsa",
          planname: "사천해변 서핑샵",
          character: 90,
          plan: 49,
          temperature: 54,
          lat: 37.836712,
          lng: 128.9212,
        },
      ],
      [
        {
          name: "Christoph",
          planname: "아르떼 강릉",
          character: 90,
          plan: 49,
          temperature: 54,
          lat: 37.79,
          lng: 128.9123,
        },
        {
          name: "Hellen",
          planname: "아르떼 강릉",
          character: 90,
          plan: 49,
          temperature: 54,
          lat: 37.78912,
          lng: 128.92311,
        },
      ],
    ],
  ];

  useEffect(() => {
    window.initMap = function () {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 37.5400456, lng: 126.9921017 },
        zoom: 10,
        disableDefaultUI: true,
      });
      let bounds = new window.google.maps.LatLngBounds();
      const infowindow = new window.google.maps.InfoWindow();
      plans[activePlan].forEach(({ name, lat, lng, type }, planIndex) => {
        const marker = new window.google.maps.Marker({
          position: { lat, lng },
          name,
          map,
          icon: {
            url: "./plans.png",
            scaledSize: new window.google.maps.Size(40, 40),
          },
        });

        bounds.extend(marker.position);

        marker.addListener("click", () => {
          map.panTo(marker.position);
          infowindow.setContent(name);
          infowindow.open({
            anchor: marker,
            map,
          });

          const newBounds = new window.google.maps.LatLngBounds();
          const partnersData = [];

          plan_partners[activePlan][planIndex].forEach(
            ({ name, planname, character, plan, temperature, lat, lng }) => {
              const partnerLatLng = new window.google.maps.LatLng(lat, lng);
              newBounds.extend(partnerLatLng);

              const marker1 = new window.google.maps.Marker({
                position: { lat, lng },
                map,
                icon: {
                  url: addr_person,
                  scaledSize: new window.google.maps.Size(50, 66.67),
                },
                label: {
                  text: name,
                  labelOrigin: new window.google.maps.Point(20, 40), // 레이블 원점 조절
                },
              });
              partnersData.push({
                name,
                planname,
                character,
                plan,
                temperature,
              });
            }
          );

          console.log(viewPartners);
          bounds = newBounds;
          console.log(bounds);
          map.fitBounds(bounds);

          setViewPartners(partnersData);
        });
      });
      map.fitBounds(bounds);
    };

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=&callback=initMap`;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      delete window.initMap;
    };
  }, [partnerMarkers, activePlan]);

  const handlePlanButtonClick = (index) => {
    setActivePlan(index);
  };

  return (
    <div>
      <TripControlButtonContainer>
        {plans.map((plan, index) => (
          <TripControlButton
            key={index}
            onClick={() => handlePlanButtonClick(index)}
          >
            <BodyBold15>Trip {index + 1}</BodyBold15>
          </TripControlButton>
        ))}
      </TripControlButtonContainer>
      {
        <BottomSheet style={{ height: bottomSheetHeight }}>
          <BottomSheetBar onClick={toggleBottomSheet} />
          {viewPartners.map((partner, index) => (
            <BottomSheetContent key={index}>
              <ProfilImageContainer>
                <CircularImageElement src={sample} alt="Circular" />
              </ProfilImageContainer>
              <BottomSheetText>
                <BottomSheetTextLine1>
                  <BodyBold15>{partner.name}</BodyBold15>
                  <BodyBold15 style={{ color: "#50E293" }}>
                    {partner.temperature} ℃
                  </BodyBold15>
                </BottomSheetTextLine1>
                <BottomSheetTextLine2>
                  <SimilarityContainer>
                    <BodyBold12 style={{ color: "#50E293" }}>
                      거리 {partner.character}점
                    </BodyBold12>
                  </SimilarityContainer>
                  <SimilarityContainer>
                    <BodyBold12 style={{ color: "#50E293" }}>
                      성격 {partner.plan}점
                    </BodyBold12>
                  </SimilarityContainer>
                </BottomSheetTextLine2>
              </BottomSheetText>
            </BottomSheetContent>
          ))}
        </BottomSheet>
      }

      <div id="map" style={{ height: "93vh", position: "relative" }}></div>
    </div>
  );
};

export default NavermyMap;
