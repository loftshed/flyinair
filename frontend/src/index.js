import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
// import { AppProvider } from "./components/AppContext";

ReactDOM.render(
  <React.StrictMode>
    {/* <AppProvider> */}
    <App />
    {/* </AppProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);
