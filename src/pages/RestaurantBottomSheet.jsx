import React from "react";
import styled from "styled-components";

const RestaurantBottomSheet = () => {
  const x = 12.34;
  const y = 56.78;
  const apiUrl = `/map/recommend?x=${x}&y=${y}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`GET 에러 발생. Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });

  return;
};

export default RestaurantBottomSheet;

/*import React, { FC } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import styled from "styled-components";
import BottomSheetHeader from "./RestaurantBottomSheetHeader.jsx";
import useBottomSheet from "./useBottomSheet.js";
import { motion } from "framer-motion";

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1;
  top: 50;
  left: 50;
  border-top-l  height: 60px;
`;

const WhiteContainer = styled.div`
  background-color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  height: 10px;
  width: 75px;
  text-align: center;
  padding: 10px;
`;

const RestaurantBottomSheet = () => {
  return (
    <div>
      <BottomSheet
        open={true}
        onDismiss={() => console.log("Bottom sheet closed")}
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #ccc",
        }}
      >
        <div>
          <h2>Your Bottom Sheet Content</h2>
        </div>
      </BottomSheet>
    </div>
  );
};

export default RestaurantBottomSheet;
*/
