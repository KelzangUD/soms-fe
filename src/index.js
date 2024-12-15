import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@mui/material/styles";
import { CommonProvider } from "./contexts/CommonContext";
import { customizedTheme } from "./customization";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={customizedTheme}>
    <CommonProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </CommonProvider>
  </ThemeProvider>
);

reportWebVitals();
