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
  const [largeFont, setLargeFont] = useState(false);
  const [userPrefTheme] = useLocalStorage("userTheme", false);
  const [userPrefFont] = useLocalStorage("userFont", false);

  useEffect(() => {
    setDarkMode(userPrefTheme);
    setLargeFont(userPrefFont);
  }, [userPrefTheme, userPrefFont]);

  const theme = useMemo<Theme>(() => {
    const baseTheme = createTheme(darkMode ? darkTheme : lightTheme);
    
    return createTheme({
      ...baseTheme,
      typography: {
        ...baseTheme.typography,
        fontSize: largeFont ? 16 : 14,
        h1: { fontSize: largeFont ? '3.5rem' : '2.5rem' },
        h2: { fontSize: largeFont ? '3rem' : '2rem' },
        h3: { fontSize: largeFont ? '2.5rem' : '1.75rem' },
        h4: { fontSize: largeFont ? '2rem' : '1.5rem' },
        h5: { fontSize: largeFont ? '1.75rem' : '1.25rem' },
        h6: { fontSize: largeFont ? '1.5rem' : '1rem' },
        subtitle1: { fontSize: largeFont ? '1.25rem' : '0.875rem' },
        body1: { fontSize: largeFont ? '1.25rem' : '1rem' },
        body2: { fontSize: largeFont ? '1.125rem' : '0.875rem' },
        button: { fontSize: largeFont ? '1.125rem' : '0.875rem' },
        caption: { fontSize: largeFont ? '1rem' : '0.75rem' },
        overline: { fontSize: largeFont ? '1rem' : '0.75rem' },
      },
      components: {
        ...baseTheme.components,
        MuiTypography: {
          styleOverrides: {
            root: {
              transition: 'font-size 250ms ease-out, color 250ms ease-out',
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              fontSize: largeFont ? '1.2rem' : '0.9rem',
              transition: 'font-size 250ms ease-out',
            },
          },
        },
        MuiMenuItem: {
          styleOverrides: {
            root: {
              fontSize: largeFont ? '1.2rem' : '0.9rem',
            },
          },
        },
      },
    });
  }, [darkMode, largeFont]);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem("userTheme", JSON.stringify(newTheme));
  };

  const toggleFontSize = () => {
    const newSize = !largeFont;
    setLargeFont(newSize);
    localStorage.setItem("userFont", JSON.stringify(newSize));
  };

  const contextValue = useMemo(() => ({
    darkMode,
    largeFont,
    toggleTheme,
    toggleFontSize,
  }), [darkMode, largeFont]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
