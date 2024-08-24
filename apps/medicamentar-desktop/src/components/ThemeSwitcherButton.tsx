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
        border: "1px solid",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {mode === "dark" ? (
        <Box component="img" border={"#000000"} src={BrighttnessSun} />
      ) : (
        <Box component="img" color={"#000000"} src={BrighttnessMoon} />
      )}
    </Button>
  );
};

export default DarkModeToggle;
