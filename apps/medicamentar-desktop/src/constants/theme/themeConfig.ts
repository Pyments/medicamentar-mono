import {
  ThemeOptions,
  PaletteOptions,
  PaletteColorOptions,
} from "@mui/material/styles";

declare module "@mui/material/styles" {
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

const CustomComponentProps = {
  MuiBox: {
    styleOverrides: {
      root: {
        transition: "background-color 250ms ease-out",
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        transition: "color 250ms ease-out",
      },
    },
  },
  MuiContainer: {
    styleOverrides: {
      root: {
        transition: "background-color 250ms ease-out",
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        transition: "background-color 250ms ease-out",
      },
    },
  },
};

const lightTheme: CustomThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      lighter: "#D4EDFF",
      light: "#91C7EF",
      main: "#1A8BCA",
      dark: "#1565c0",
      darker: "#0078B6",
    },
    background: {
      default: "#ffffff",
      paper: "#EFF0F3",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
  },
  components: CustomComponentProps,
};

const darkTheme: CustomThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      lighter: "#91C7EF",
      light: "#1A8BCA",
      main: "#103952",
      dark: "#0A2739",
      darker: "#092332",
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
  components: CustomComponentProps,
};

export { lightTheme, darkTheme };
