import { Box, AppBar } from "@mui/material";
import logoWhite from "../assets/icons/logoWhite.svg";
import logoBlue from "../assets/icons/logoBlue.svg";
import { useLocation } from "react-router-dom";
import DarkModeToggle from "./ThemeSwitcherButton";

import { useTheme } from "../constants/theme/useTheme";

function Header() {
  const { darkMode } = useTheme();
  const location = useLocation().pathname;
  const condition = location == "/signin" || location == "/register";

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: "100vw",
        height: "100px",
        backgroundColor: darkMode ? "primary.darker" : "primary.main",
        background: condition ? "none" : "solid",
        padding: "27px 45px",
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        zIndex: 1201,
        boxShadow: condition ? 0 : 3,
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
