import { Box, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useTheme } from "@constants/theme/useTheme";

import BrighttnessSun from "@assets/icons/BrightnessSun.svg";
import BrighttnessMoon from "@assets/icons/BrightnessMoon.svg";
import BrighttnessSunBlue from "@assets/icons/BrightnessSunBlue.svg";
import BrighttnessMoonBlue from "@assets/icons/BrightnessMoonBlue.svg";

const DarkModeToggle = () => {
  const location = useLocation().pathname;
  const condition =
    location === "/" ||
    location === "/signin" ||
    location === "/register" ||
    location === "/reset-password" ||
    location === "/forgot-password";
  const { darkMode, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      sx={{
        display: "flex",
        borderRadius: "50%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {darkMode ? (
        <Box
          component="img"
          src={condition ? BrighttnessSunBlue : BrighttnessSun}
        />
      ) : (
        <Box
          component="img"
          src={condition ? BrighttnessMoonBlue : BrighttnessMoon}
        />
      )}
    </Button>
  );
};

export default DarkModeToggle;
