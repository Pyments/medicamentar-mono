// ThemeProvider.tsx
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
  const [userPrefFontSize] = useLocalStorage("userFontSize", false);

  useEffect(() => {
    setDarkMode(userPrefTheme);
    setLargeFont(userPrefFontSize);
  }, [userPrefTheme, userPrefFontSize]);

  const theme = useMemo<Theme>(() => {
    const baseTheme = createTheme(darkMode ? darkTheme : lightTheme);
    
    return createTheme({
      ...baseTheme,
      typography: {
        ...baseTheme.typography,
        fontSize: largeFont ? 18 : 14,
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
      },
    });
  }, [darkMode, largeFont]);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem("userTheme", JSON.stringify(newTheme));
  };

  const toggleFontSize = () => {
    const newFontSize = !largeFont;
    setLargeFont(newFontSize);
    localStorage.setItem("userFontSize", JSON.stringify(newFontSize));
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
}; // <-- Esta é a única chave de fechamento do componente