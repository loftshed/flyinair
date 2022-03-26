import { useState, createContext } from "react";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [availableFlights, setAvailableFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState("");
  const [selectedSeat, setSelectedSeat] = useState("");

  return (
    <AppContext.Provider
      value={{
        availableFlights,
        setAvailableFlights,
        selectedFlight,
        setSelectedFlight,
        selectedSeat,
        setSelectedSeat,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
