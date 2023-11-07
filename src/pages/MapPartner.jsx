import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
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
      temperature: 99,
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
      temperature: 87,
    },
  ];

  const initialMapCenter = calculateMapCenter(plans);
  const initialMapZoom = calculateMapZoom(plans);
  const [selectedPartner, setSelectedPartner] = useState(null);

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [mapCenter, setMapCenter] = useState(initialMapCenter);
  const [mapZoom, setMapZoom] = useState(initialMapZoom);
  const [restaurants, setRestaurants] = useState([]);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setMapCenter({ lat: marker.lat, lng: marker.lng });
    setMapZoom(calculateMapZoom([marker]));
    console.log(marker);
    if (marker.type === "plan") {
      setSelectedPlan(marker);
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
    if (marker.type === "plan") {
      setSelectedPlan(marker);
      console.log(selectedPlan);
    }
  };

  useEffect(() => {
    console.log(mapCenter);
    console.log(mapZoom);
  }, [mapCenter, mapZoom]);

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
      </GoogleMapReact>
      {selectedPartner && (
        <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
          {selectedPartner
            .sort((a, b) => b.temperature - a.temperature)
            .map((partner, index) => (
              <Paper
                key={index}
                style={{
                  display: "inline-block",
                  margin: "10px",
                  padding: "10px",
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
