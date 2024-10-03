import { Box, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useTheme } from "../constants/theme/useTheme";

import BrighttnessSun from "../../public/assets/icons/BrightnessSun.svg";
import BrighttnessMoon from "../../public/assets/icons/BrightnessMoon.svg";
import BrighttnessSunBlue from "../../public/assets/icons/BrightnessSunBlue.svg";
import BrighttnessMoonBlue from "../../public/assets/icons/BrightnessMoonBlue.svg";

const DarkModeToggle = () => {
  const location = useLocation().pathname;
  const condition = location == "/signin" || location == "/register";
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
