import { useState, createContext } from "react";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [flights, setFlights] = useState([]);

  return (
    <AppContext.Provider value={{ flights, setFlights }}>
      {children}
    </AppContext.Provider>
  );
};
