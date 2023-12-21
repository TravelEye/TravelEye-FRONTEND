// TripContext.js

import { createContext, useContext, useState } from "react";

const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [updatedTripData, setUpdatedTripData] = useState(null);

  return (
    <TripContext.Provider value={{ updatedTripData, setUpdatedTripData }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTripContext = () => {
  return useContext(TripContext);
};
