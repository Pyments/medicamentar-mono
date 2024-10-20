import { Box, AppBar } from "@mui/material";
import logoWhite from "../assets/icons/logoWhite.svg";
import logoBlue from "../assets/icons/logoBlue.svg";
import { useLocation } from "react-router-dom";
import DarkModeToggle from "./ThemeSwitcherButton";

import { useTheme } from "../constants/theme/useTheme";

function Header() {
  const { darkMode } = useTheme();
  const location = useLocation().pathname;

  const condition =
    location == "/signin" ||
    location == "/register" ||
    location == "/reset-password" ||
    location == "/forgot-password";

  const mainBg = () => {
    if (condition) return "transparent";
    if (darkMode) return "primary.darker";
    return "primary.main";
  };

  return (
    <AppBar
      elevation={0}
      sx={{
        position: "fixed",
        width: "100%",
        height: "100px",
        background: condition ? "none" : "solid",
        padding: "27px 45px",
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        zIndex: 1201,
        boxShadow: condition ? 0 : 3,
        backgroundColor: mainBg,
      }}
    >
      <Box sx={{ flex: condition ? 1 : 0 }} />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: condition ? "center" : "normal",
          alignItems: "center",
        }}
      >
        <img
          style={{ width: "255px", height: "46px" }}
          src={condition ? logoBlue : logoWhite}
          alt="medicamentar logo"
        />
      </Box>
      <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
        <DarkModeToggle />
      </Box>
    </AppBar>
  );
}
export default Header;
