import { useState, createContext } from "react";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [availableFlights, setAvailableFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState("");

  return (
    <AppContext.Provider
      value={{
        availableFlights,
        setAvailableFlights,
        selectedFlight,
        setSelectedFlight,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
