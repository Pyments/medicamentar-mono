import { Box, Button } from "@mui/material";
import { useThemeContext } from "../constants/theme/ThemeContextProvider";
import { useLocation } from "react-router-dom";

import BrighttnessSun from "../../public/assets/icons/BrightnessSun.svg";
import BrighttnessMoon from "../../public/assets/icons/BrightnessMoon.svg";
import BrighttnessSunBlue from "../../public/assets/icons/BrightnessSunBlue.svg";
import BrighttnessMoonBlue from "../../public/assets/icons/BrightnessMoonBlue.svg";

const DarkModeToggle = () => {
  const { mode, toggleColorMode } = useThemeContext();
  const location = useLocation().pathname;
  const condition = location == "/signin" || location == "/register";
  return (
    <Button
      onClick={toggleColorMode}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {mode === "dark" && condition ? (
        <Box component="img" src={BrighttnessSunBlue} />
      ) : mode === "dark" && !condition ? (
        <Box component="img" src={BrighttnessSun} />
      ): mode === "light" && condition ? (
        <Box component="img" src={BrighttnessMoonBlue} />
      ) : <Box component="img" src={BrighttnessMoon} />
      }
    </Button>
  );
};

export default DarkModeToggle;
