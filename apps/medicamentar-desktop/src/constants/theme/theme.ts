import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        common: {
            black: "#1E1F24",
            white: "#FCFCFD",
        },
        primary: {
            light: "#91C7EF",
            main: "#1A8BCA",
            dark: "#0078B6"
        },
        secondary: {
            main: "#104015",
            light: "#00C040",
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

        text: {
            primary: "#15110e",
            secondary: "#4D4D4D",
            disabled: "#B2B2B2",
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
        borderRadius: 8
    }
});

export default theme;