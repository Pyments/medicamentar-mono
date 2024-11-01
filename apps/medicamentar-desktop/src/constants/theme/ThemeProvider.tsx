import React, { useState, useMemo } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  Theme,
} from "@mui/material/styles";
import { ThemeContext } from "./ThemeContext";
import { lightTheme, darkTheme } from "./themeConfig";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo<Theme>(() => {
    return createTheme(darkMode ? darkTheme : lightTheme);
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const contextValue = useMemo(
    () => ({
      darkMode,
      toggleTheme,
    }),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
