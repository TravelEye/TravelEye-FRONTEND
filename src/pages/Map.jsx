import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlineIcon from "@material-ui/icons/LocationOnOutlined";
import { Rating } from "@material-ui/lab";

const Map = () => {
  const plans = [
    { name: "용두암", lat: 33.516213, lng: 126.512063 },
    { name: "제주시민속오일시장", lat: 33.496799, lng: 126.475579 },
    { name: "한라수목원", lat: 33.469857, lng: 126.493385 },
    // 다른 위치 데이터를 추가할 수 있습니다.
  ];

  // 중앙점과 확대 수준을 계산
  const mapCenter = calculateMapCenter(plans);
  console.log(mapCenter);
  const mapZoom = calculateMapZoom(plans);
  console.log(mapZoom);

  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "key",
        }}
        defaultCenter={mapCenter}
        defaultZoom={mapZoom}
        options={{ disableDefaultUI: true }}
      >
        {plans.map((plan, index) => (
          <MarkerF
            key={index}
            lat={plan.lat}
            lng={plan.lng}
            text={plan.name}
            icon={{
              url: "/plans.png",
              scaledSize: { width: 48, height: 48 },
            }}
            onClick={() => handleMarkerClick(plan)}
          />
        ))}
        {selectedMarker && (
          <InfoWindowF
            lat={selectedMarker.lat}
            lng={selectedMarker.lng}
            text={selectedMarker.name}
          />
        )}
      </GoogleMapReact>
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
        width: 32,
        height: 32,
      }}
    />
    {text}
  </div>
);

const InfoWindowF = ({ lat, lng, text }) => (
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

export default Map;
