import { useState, createContext } from "react";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [availableFlights, setAvailableFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState("");
  const [selectedSeat, setSelectedSeat] = useState("");
  const [reservationId, setReservationId] = useState("");
  const [currentReservation, setCurrentReservation] = useState({});

  return (
    <AppContext.Provider
      value={{
        availableFlights,
        setAvailableFlights,
        selectedFlight,
        setSelectedFlight,
        selectedSeat,
        setSelectedSeat,
        reservationId,
        setReservationId,
        currentReservation,
        setCurrentReservation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
