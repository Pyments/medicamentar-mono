import { createContext } from "react";

interface ThemeContextType {
  darkMode: boolean;
  largeFont: boolean;
  toggleTheme: () => void;
  toggleFontSize: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  largeFont: false,
  toggleTheme: () => {},
  toggleFontSize: () => {},
});
