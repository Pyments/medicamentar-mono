import "@mui/material/styles/createPalette";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      deepest: "#103952",
      deep: "#0078B6",
      darkest: "#002f4a",
      darker: "#336988",
      dark: "#0f5c94",
      main: "#1a8bca",
      light: "#5ac6f0",
      lighter: "#91C7EF",
      lightest: "#D4EDFF",
      pale: "#E4F4FF",
      faint: "#F4FAFE",
    },
    secondary: {
      main: "#00446b",
      dark: "#002f4a",
      light: "#336988",
    },
    common: {
      black: "#1E1F24",
      white: "#FCFCFD",
    },
    grey: {
      50: "#FCFCFD",
      100: "#F9F9FB",
      200: "#EFF0F3",
      300: "#E7E8EC",
      400: "#E0E1E6",
      500: "#D8D9E0",
      600: "#CDCED7",
      700: "#B9BBC6",
      800: "#8B8D98",
      900: "#80828D",
      A100: "#F9F9FB",
      A200: "#EFF0F3",
      A400: "#E0E1E6",
      A700: "#B9BBC6",
    },
  },
  typography: {
    h1: {
      fontSize: "3rem",
      fontWeight: 800,
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 800,
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    fontFamily: ["Montserrat"].join(","),
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
