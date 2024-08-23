import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./pages/router.tsx";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { ThemeContextProvider } from "./constants/theme/ThemeContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline>
      <ThemeContextProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeContextProvider>
    </CssBaseline>
  </React.StrictMode>
);

// Use contextBridge
window.ipcRenderer.on("main-process-message", (_event, message) => {
  console.log(message);
});
