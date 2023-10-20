import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlineIcon from "@material-ui/icons/LocationOnOutlined";
import { Rating } from "@material-ui/lab";

const Map = () => {
  const initialCoordinates = {
    lat: 33.499784,
    lng: 126.514969, // 위도와 경도
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "API_key" }}
        defaultCenter={initialCoordinates}
        defaultZoom={15}
      ></GoogleMapReact>
    </div>
  );
};

export default Map;
