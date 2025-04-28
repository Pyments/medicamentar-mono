import React, { useState, useMemo, useEffect } from "react";
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { createTheme, Theme } from '@mui/material/styles';

import { ThemeContext } from "./ThemeContext";
import { lightTheme, darkTheme } from "./themeConfig";
import { useLocalStorage } from "@hooks/UseLocalStorage";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [darkMode, setDarkMode] = useState(false);
  const [userPrefTheme] = useLocalStorage("userTheme", false);

  useEffect(() => {
    setDarkMode(userPrefTheme);
  }, [userPrefTheme]);

  const theme = useMemo<Theme>(() => {
    return createTheme(darkMode ? darkTheme : lightTheme);
  }, [darkMode]);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem("userTheme", JSON.stringify(newTheme));
  };

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
