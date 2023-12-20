import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BodyBold15, BodyBold12 } from "./fonts.js";
import axios from "axios";
import addr_spoon from "../assets/images/addr_spoon.png";
import zzim_on from "../assets/images/zzim_on.png";
import zzim_off from "../assets/images/zzim_off.png";

const TripControlButtonContainer = styled.div`
  position: absolute;
  top: 5%;
  left: 10%;
  display: flex;
  gap: 10px;
  flex-direction: column;
`;
const TripControlButton = styled.button`
  background-color: ${(props) => (props.active ? "#50e093" : "#999999")};
  height: 20px;
  border-radius: 20px;
  z-index: 2;
  border: none;
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
  //white-space: nowrap;
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
  //overflow: hidden; /*글자 넘치면 숨김*/
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
const Zzimimg = styled.img`
  height: 20px;
`;

const NavermyMapRestaurant = () => {
  const [partnerMarkers, setPartnerMarkers] = useState([]);
  const [activePlan, setActivePlan] = useState(0);
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [bottomSheetHeight, setBottomSheetHeight] = useState("10%"); // 추가된 부분
  const [isZzimOn, setZzimon] = useState(false);

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

        marker.addListener("click", () =>
          handleMarkerClick(marker, map, infowindow)
        );

        partnerMarkers.push(marker);
      });

      map.fitBounds(bounds);
    };

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDwnlbxENxKY3ubbVjDBtH_x4GOZy_2fSU&callback=initMap`;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      delete window.initMap;
    };
  }, [partnerMarkers, activePlan]);

  const handleMarkerClick = async (marker, map, infowindow) => {
    map.panTo(marker.position);
    infowindow.setContent(marker.name);
    infowindow.open({
      anchor: marker,
      map,
    });

    const requestData = {
      locationRestriction: {
        circle: {
          center: {
            latitude: marker.position.lat(),
            longitude: marker.position.lng(),
          },
          radius: 500,
        },
      },
      includedTypes: ["restaurant"],
      maxResultCount: 20,
    };

    try {
      const response = await axios.post(
        `https://places.googleapis.com/v1/places:searchNearby?key=AIzaSyDwnlbxENxKY3ubbVjDBtH_x4GOZy_2fSU`,
        requestData,
        {
          headers: {
            "X-Goog-FieldMask":
              "places.displayName,places.id,places.location,places.rating",
          },
        }
      );

      const responseData = response.data;
      console.log(responseData);
      if (responseData && responseData.places) {
        const filteredRestaurants = responseData.places
          .filter((restaurant) => restaurant.rating >= 4)
          .map((restaurant) => ({
            ...restaurant,
            type: "restaurant",
          }));

        setRestaurants(filteredRestaurants);

        partnerMarkers.forEach((m) => m.setMap(null));

        const newBounds = new window.google.maps.LatLngBounds();

        filteredRestaurants.forEach(
          ({ displayName, location: { latitude, longitude }, rating }) => {
            const restaurantLatLng = new window.google.maps.LatLng(
              latitude,
              longitude
            );
            newBounds.extend(restaurantLatLng);

            const restaurantMarker = new window.google.maps.Marker({
              position: { lat: latitude, lng: longitude },
              map,
              icon: {
                url: addr_spoon,
                scaledSize: new window.google.maps.Size(50, 66.67),
              },
              label: {
                text: displayName.text,
                labelOrigin: new window.google.maps.Point(20, 40),
              },
            });

            partnerMarkers.push(restaurantMarker);
          }
        );

        map.fitBounds(newBounds);
      } else {
        console.error("API 응답 오류: 유효한 데이터가 없습니다.");
      }
    } catch (error) {
      console.error(
        "음식점 데이터를 불러오는 동안 오류가 발생했습니다: " + error
      );
    }
    console.log(restaurants);
  };

  const handlePlanButtonClick = (index) => {
    setActivePlan(index);
  };

  const [favorites, setFavorites] = useState([]);
  const [activeFavorites, setActiveFavorites] = useState([]);
  const fetchFavorites = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:80/food/favorites", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMUBnbWFpbC5jb20iLCJhdXRoIjoiVVNFUiIsImV4cCI6MTcwMzE3MTgzOH0.SBZpwxzPrlzb51hyHEH7ADe-pJcYWjpS_isziClGEn_XoT7AzHsQIaAGTLaGuRkgS-kJzVAKnd9kpUvktd4-3Q",
        },
      });

      setFavorites(response.data.data);
      console.log(favorites);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };
  useEffect(() => {
    fetchFavorites();
  }, []);

  useEffect(() => {
    const activeFavorites = favorites.map((favorite) => favorite.restaurantId);
    setActiveFavorites(activeFavorites);
    console.log(activeFavorites);
  }, [favorites]);

  const handleZzimClick = async (restaurantId, restaurantName) => {
    try {
      const isFavorite = activeFavorites.includes(restaurantId);
      const updatedFavorites = isFavorite
        ? activeFavorites.filter((id) => id !== restaurantId)
        : [...activeFavorites, restaurantId];

      setActiveFavorites(updatedFavorites);

      if (isFavorite) {
        await handleDeleteZzim(restaurantId);
      } else {
        await handleAddZzim(restaurantId, restaurantName);
      }

      console.log("Favorite updated successfully!");
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  const handleAddZzim = async (restaurantId, restaurantName) => {
    try {
      await axios.post(
        "http://127.0.0.1:80/food/favorites",
        {
          restaurantId: restaurantId,
          restaurantName: restaurantName,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMUBnbWFpbC5jb20iLCJhdXRoIjoiVVNFUiIsImV4cCI6MTcwMzE3MTgzOH0.SBZpwxzPrlzb51hyHEH7ADe-pJcYWjpS_isziClGEn_XoT7AzHsQIaAGTLaGuRkgS-kJzVAKnd9kpUvktd4-3Q",
            "Content-type": "application/json",
          },
        }
      );

      console.log("Favorite added successfully!");
      fetchFavorites();
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };
  const handleDeleteZzim = async (restaurantId) => {
    try {
      const favoriteToDelete = favorites.find(
        (favorite) => favorite.restaurantId === restaurantId
      );

      if (!favoriteToDelete) {
        console.error(`Favorite not found for restaurantId ${restaurantId}`);
        return;
      }

      await axios.delete(
        `http://127.0.0.1:80/food/favorites/${favoriteToDelete.id}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMUBnbWFpbC5jb20iLCJhdXRoIjoiVVNFUiIsImV4cCI6MTcwMzE3MTgzOH0.SBZpwxzPrlzb51hyHEH7ADe-pJcYWjpS_isziClGEn_XoT7AzHsQIaAGTLaGuRkgS-kJzVAKnd9kpUvktd4-3Q",
          },
        }
      );

      console.log("Favorite deleted successfully!");
      fetchFavorites();
    } catch (error) {
      console.error("Error deleting favorite:", error);
    }
  };

  return (
    <div>
      <TripControlButtonContainer>
        {plans.map((plan, index) => (
          <TripControlButton
            key={index}
            onClick={() => handlePlanButtonClick(index)}
            active={index === activePlan}
          >
            <BodyBold12>Trip {index + 1}</BodyBold12>
          </TripControlButton>
        ))}
      </TripControlButtonContainer>

      {
        <BottomSheet style={{ height: bottomSheetHeight }}>
          <BottomSheetBar onClick={toggleBottomSheet} />
          {restaurants.map((restaurant, index) => (
            <BottomSheetContent key={index}>
              <BottomSheetText>
                <BottomSheetTextLine1>
                  <BodyBold15>{restaurant.displayName.text}</BodyBold15>
                  <Zzimimg
                    src={
                      activeFavorites.includes(restaurant.id)
                        ? zzim_on
                        : zzim_off
                    }
                    onClick={() =>
                      handleZzimClick(
                        restaurant.id,
                        restaurant.displayName.text
                      )
                    }
                    style={
                      isZzimOn === true
                        ? { width: "20px", height: "20px" }
                        : { width: "20px", height: "16px" }
                    }
                  />
                </BottomSheetTextLine1>
                <BottomSheetTextLine2>
                  <SimilarityContainer>
                    <BodyBold12 style={{ color: "#50E293" }}>
                      거리 {restaurant.distance}점
                    </BodyBold12>
                  </SimilarityContainer>
                  <SimilarityContainer>
                    <BodyBold12 style={{ color: "#50E293" }}>
                      별점 {restaurant.rating}점
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

export default NavermyMapRestaurant;
