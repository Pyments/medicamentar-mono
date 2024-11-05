import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./pages/router.tsx";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/AuthContext.tsx";
import { ThemeProvider } from "./constants/theme/ThemeProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </CssBaseline>
  </React.StrictMode>
);
