import { Box, Button } from "@mui/material";
import { useThemeContext } from "../constants/theme/ThemeContextProvider";

import BrighttnessSun from "../../public/assets/icons/BrightnessSun.svg";
import BrighttnessMoon from "../../public/assets/icons/BrightnessMoon.svg";

const DarkModeToggle = () => {
  const { mode, toggleColorMode } = useThemeContext();

  return (
    <Button
      onClick={toggleColorMode}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {mode === "dark" ? (
        <Box component="img" src={BrighttnessSun} />
      ) : (
        <Box component="img" src={BrighttnessMoon} />
      )}
    </Button>
  );
};

export default DarkModeToggle;
