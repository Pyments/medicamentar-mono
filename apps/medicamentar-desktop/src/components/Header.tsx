import { Box } from "@mui/material";
import logoWhite from "../../public/assets/icons/logoWhite.svg";
import logoBlue from "../../public/assets/icons/logoBlue.svg";
import { useLocation } from "react-router-dom";
import DarkModeToggle from "./ThemeSwitcherButton";

export default function Header() {
  const location = useLocation().pathname;
  const condition = location == "/register" || location == "/register";
  return (
    <Box
    sx={{
      width: "100vw",
      height: "100px",
      backgroundColor:
        condition ? "transparent" : theme => theme.palette.primary.light,
      padding: "27px 45px",
      display: "flex",
    }}
  >
    <Box sx={{ 
      width: "100vw", 
      display: "flex", 
      justifyContent: condition ? "space-between" : "space-between" 
      }}>
      <img
        style={{ width: "255px", height: "46px", margin: condition ? "0" : "0 auto" }}
        src={ condition ? logoBlue : logoWhite}
        alt="medicamentar logo"
      />
      <DarkModeToggle/>
    </Box>
  </Box>
  );
}