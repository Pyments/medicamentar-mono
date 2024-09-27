// themeConfig.ts
import { ThemeOptions, PaletteOptions,PaletteColorOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface PaletteColor {
    lighter?: string;
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
  }

  interface PaletteOptions {
    primary?: PaletteColorOptions;
    secondary?: PaletteColorOptions;
    error?: PaletteColorOptions;
    warning?: PaletteColorOptions;
    info?: PaletteColorOptions;
    success?: PaletteColorOptions;
  }
}

interface CustomThemeOptions extends ThemeOptions {
  palette?: PaletteOptions;
}

const lightTheme: CustomThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      lighter: "#91C7EF",
      light: "#42a5f5",
      main: "#1A8BCA",
      dark: "#1565c0",
      darker: "#0078B6"
    },
    secondary: {
      main: "#dc004e",
      light: "#ff4081",
      dark: "#c51162",
    },
    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
  },
};

const darkTheme: CustomThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      lighter: "#007EC1",
      light: "#0078B6",
      main: "#103952",
      dark: "#0A2739",
      darker: "#092332"
    },
    secondary: {
      main: "#f48fb1",
      light: "#ffc1e3",
      dark: "#bf5f82",
    },
    background: {
      default: "#103952",
      paper: "#62636C",
    },
    text: {
      primary: "#E7E8EC",
      secondary: "#CDCED7",
    },
  },
};

export { lightTheme, darkTheme };