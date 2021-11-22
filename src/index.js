import React from "react";
import ReactDOM from "react-dom";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { ColorModeContextProvider } from "./UI/CustomTheme";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <ColorModeContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ColorModeContextProvider>
  </StyledEngineProvider>,
  document.getElementById("root")
);
