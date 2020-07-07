import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
  // Aquí decía React.StrictMode
  <React.Fragment>
    <App />
  </React.Fragment>,
  document.getElementById("root")
);
