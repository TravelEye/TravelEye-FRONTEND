import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlineIcon from "@material-ui/icons/LocationOnOutlined";
import { Rating } from "@material-ui/lab";
import axios from "axios";

const my_api_key = "";

const MapPartner = () => {
  const plans = [
    { name: "용두암", lat: 33.516213, lng: 126.512063, type: "plan" },
    {
      name: "제주시민속오일시장",
      lat: 33.496799,
      lng: 126.475579,
      type: "plan",
    },
    { name: "한라수목원", lat: 33.469857, lng: 126.493385, type: "plan" },
  ];

  const partners = [
    {
      name: "Juliette",
      planname: "용두암",
      character: 90,
      plan: 49,
      temperature: 54,
    },
    {
      name: "Christoph",
      planname: "한라수목원",
      character: 90,
      plan: 49,
      temperature: 54,
    },
    {
      name: "Anna",
      planname: "제주시민속오일시장",
      character: 90,
      plan: 49,
      temperature: 54,
    },
    {
      name: "Lara",
      planname: "용두암",
      character: 90,
      plan: 49,
      temperature: 54,
    },
    {
      name: "Philip",
      planname: "용두암",
      character: 90,
      plan: 49,
      temperature: 54,
    },
  ];

  const initialMapCenter = calculateMapCenter(plans);
  const initialMapZoom = calculateMapZoom(plans);
  const [selectedPartner, setSelectedPartner] = useState(null);

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [mapCenter, setMapCenter] = useState(initialMapCenter);
  const [mapZoom, setMapZoom] = useState(initialMapZoom);
  const [restaurants, setRestaurants] = useState([]);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setMapCenter({ lat: marker.lat, lng: marker.lng });
    setMapZoom(calculateMapZoom([marker]));
    console.log(marker);
    if (marker.type === "restaurant") {
      setSelectedRestaurant(marker);
      setSelectedPlan(null);
      console.log(selectedRestaurant);
    } else if (marker.type === "plan") {
      setSelectedPlan(marker);
      setSelectedRestaurant(null);
      console.log(selectedPlan);
      console.log(marker);
      console.log("Partners:", partners);

      const matchingPartners = partners.filter(
        (partner) => partner.planname === marker.name
      );
      console.log(matchingPartners);
      setSelectedPartner(matchingPartners);
    }
  };

  const handleMarkerClick1 = (marker) => {
    setSelectedMarker(marker);
    if (marker.type === "restaurant") {
      setSelectedRestaurant(marker);
      setSelectedPlan(null);
      console.log(selectedRestaurant);
    } else if (marker.type === "plan") {
      setSelectedPlan(marker);
      setSelectedRestaurant(null);
      console.log(selectedPlan);
    }
  };

  useEffect(() => {
    console.log(mapCenter);
    console.log(mapZoom);
  }, [mapCenter, mapZoom]);

  useEffect(() => {
    const requestData = {
      locationRestriction: {
        circle: {
          center: {
            latitude: mapCenter.lat,
            longitude: mapCenter.lng,
          },
          radius: 500,
        },
      },
      includedTypes: ["restaurant"],
      maxResultCount: 20,
    };

    axios
      .post(
        `https://places.googleapis.com/v1/places:searchNearby?key=${my_api_key}`,
        requestData,
        {
          headers: {
            "X-Goog-FieldMask":
              "places.displayName,places.id,places.location,places.rating",
          },
        }
      )
      .then((response) => {
        const responseData = response.data;
        if (responseData && responseData.places) {
          const filteredRestaurants = responseData.places
            .filter((restaurant) => restaurant.rating >= 4)
            .map((restaurant) => ({ ...restaurant, type: "restaurant" })); // type을 추가해줌.

          setRestaurants(filteredRestaurants);
          console.log(restaurants);
        } else {
          console.error("API 응답 오류: 유효한 데이터가 없습니다.");
        }
      })
      .catch((error) => {
        console.error(
          "음식점 데이터를 불러오는 동안 오류가 발생했습니다: " + error
        );
      });
  }, [mapCenter]);

  const googleMapKey = `${mapCenter.lat}_${mapCenter.lng}_${mapZoom}`;

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: `${my_api_key}`,
        }}
        defaultCenter={mapCenter}
        defaultZoom={mapZoom}
        options={{ disableDefaultUI: true }}
        key={googleMapKey}
      >
        {plans.map((plan, index) => (
          <MarkerF
            key={index}
            lat={plan.lat}
            lng={plan.lng}
            text={plan.name}
            type="plan"
            onClick={(e) => handleMarkerClick(plan)}
          />
        ))}
        {selectedPlan && (
          <InfoWindowPlan
            lat={selectedPlan.lat}
            lng={selectedPlan.lng}
            text={selectedPlan.name}
          />
        )}
        {restaurants.map((restaurant, index) => (
          <MarkerF1
            key={index}
            lat={restaurant.location.latitude}
            lng={restaurant.location.longitude}
            text={restaurant.displayName.text}
            rating={restaurant.rating}
            type="restaurant"
            onClick={(e) => handleMarkerClick1(restaurant)}
          />
        ))}
        {selectedRestaurant && (
          <InfoWindowRestaurant
            lat={selectedRestaurant.lat}
            lng={selectedRestaurant.lng}
            text={selectedRestaurant.displayName.text}
            rating={selectedRestaurant.rating}
          />
        )}
      </GoogleMapReact>
      {selectedPartner && (
        <div style={{ display: "flex", flexDirection: "row" }}>
          {selectedPartner.map((partner, index) => (
            <Paper
              key={index}
              style={{
                position: "relative",
                marginLeft: "20px",
                padding: "10px",
                zIndex: 999,
              }}
            >
              <Typography variant="h6">Partner Information</Typography>
              <Typography variant="body2">Name: {partner.name}</Typography>
              <Typography variant="body2">
                Temperature: {partner.temperature}도
              </Typography>
              <Typography variant="body2">
                성격유사도: {partner.character}%
              </Typography>
              <Typography variant="body2">
                일정유사도: {partner.plan}%
              </Typography>
              <button
                onClick={() => setSelectedPartner(null)}
                variant="contained"
                color="secondary"
              >
                닫기
              </button>
            </Paper>
          ))}
        </div>
      )}
    </div>
  );
};

const MarkerF = ({ text, onClick }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      color: "green",
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    <img
      src="/plans.png"
      style={{
        width: 40,
        height: 40,
      }}
    />
    {text}
  </div>
);

const MarkerF1 = ({ text, onClick }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      color: "green",
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    <img
      src="/Restaurant.png"
      style={{
        width: 25,
        height: 25,
      }}
    />
    {text}
  </div>
);

const InfoWindowRestaurant = ({ lat, lng, text, rating }) => (
  <div
    style={{
      position: "absolute",
      top: lat,
      left: lng,
      backgroundColor: "white",
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "4px",
    }}
  >
    <Typography variant="body2">{text}</Typography>
    <Rating name="read-only" value={rating} readOnly />
  </div>
);

const InfoWindowPlan = ({ lat, lng, text }) => (
  <div
    style={{
      position: "absolute",
      top: lat,
      left: lng,
      backgroundColor: "white",
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "4px",
    }}
  >
    <Typography variant="body2">{text}</Typography>
  </div>
);

function calculateMapCenter(plans) {
  const totalLat = plans.reduce((sum, plan) => sum + plan.lat, 0);
  const totalLng = plans.reduce((sum, plan) => sum + plan.lng, 0);
  const centerLat = totalLat / plans.length;
  const centerLng = totalLng / plans.length;
  return { lat: centerLat, lng: centerLng };
}

function calculateMapZoom(plans) {
  return 13;
}

export default MapPartner;
