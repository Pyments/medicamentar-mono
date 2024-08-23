import React from "react";
import { getDesignTokens } from "./theme";
import { createTheme, PaletteMode } from "@mui/material";

export const useColorTheme = () => {
    const [mode, setMode] = React.useState<PaletteMode>("light");

    const toggleColorMode = () =>
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));

    // const modifiedTheme = React.useMemo(
    //   () =>
    //     createTheme({
    //       ...theme,
    //       palette: {
    //         ...theme.palette,
    //         mode,
    //       },
    //     }),
    //   [mode]
    // );

    const modifiedTheme = React.useMemo(
        () => createTheme(getDesignTokens(mode)),
        [mode]
    );

    return {
        theme: modifiedTheme,
        mode,
        toggleColorMode,
    };
};