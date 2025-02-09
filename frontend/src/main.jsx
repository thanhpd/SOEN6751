import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider, THEME_ID } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material/styles";
import { materialTheme } from "./MaterialTheme.js";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={{ [THEME_ID]: materialTheme }}>
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StyledEngineProvider>
  </ThemeProvider>,
);
