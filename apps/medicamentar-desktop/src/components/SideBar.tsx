import { useAuth } from '../hooks/useAuth';

import Pill_Icon from "../assets/icons/Pill_Icon";
import Timer_Icon from "../assets/icons/Timer_Icon";
import Config_Icon from "../assets/icons/Config_Icon";
import Logout_Icon from "../assets/icons/Logout_Icon";
import Profile_Icon from "../assets/icons/Profile_Icon";
import Stethoscope_Icon from "../assets/icons/Stethoscope_Icon";

import Dark_Pill_Icon from "../assets/icons/Dark_Pill_Icon.svg";
import Dark_Timer_Icon from "../assets/icons/Dark_Timer_Icon.svg";
import Dark_Config_Icon from "../assets/icons/Dark_Config_Icon.svg";
import Dark_Logout_Icon from "../assets/icons/Dark_Logout_Icon.svg";
import Dark_Profile_Icon from "../assets/icons/Dark_Profile_Icon.svg";
import Dark_Stethoscope_Icon from "../assets/icons/Dark_Stethoscope_Icon.svg";

import { useNavigate } from "react-router-dom";

import { useTheme } from "../constants/theme/useTheme";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const items = [
    {
      text: "EVENTOS PRÓXIMOS",
      icon: darkMode ? <img src={Dark_Timer_Icon} /> : <Timer_Icon />,
      action: "events",
    },
    {
      text: "CONSULTAS E EXAMES",
      icon: darkMode ? (
        <img src={Dark_Stethoscope_Icon} />
      ) : (
        <Stethoscope_Icon />
      ),
      action: 'exam'
    },
    {
      text: "MEDICAMENTOS",
      icon: darkMode ? <img src={Dark_Pill_Icon} /> : <Pill_Icon />,
      action: "medicine",
    },
    {
      text: "PERFIL",
      icon: darkMode ? <img src={Dark_Profile_Icon} /> : <Profile_Icon />,
      action: "profile"
    },
    {
      text: "CONFIGURAÇÕES",
      icon: darkMode ? <img src={Dark_Config_Icon} /> : <Config_Icon />,
      action: "config"
    },
    {
      text: "SAIR",
      icon: darkMode ? <img src={Dark_Logout_Icon} /> : <Logout_Icon />,
      action: "logout",
    },
  ];
  const drawerStyles = {
    width: 300,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: 300,
      zIndex: 1200,
      borderRight: "none",
      paddingTop: "128px",
      boxSizing: "border-box",
      backgroundColor: darkMode ? "primary.dark" : "gray.100",
    },
  };

  const listItemStyles = {
    display: "flex",
    alignItems: "center",
    "&:hover": {
      backgroundColor: darkMode ? "primary.main" : "primary.lighter",
    },
  };

  const listItemIconStyles = {
    display: "flex",
    justifyContent: "center",
  };

  const handleItemClick = async (action: string | undefined) => {
    if (action === "logout") {
      await window.electron.store.delete("email");
      await window.electron.store.delete("password");
      await logout();
    } else if (action === "events") {
      navigate("/home");
    } else if (action === "medicine") {
      navigate("/medicine");
    } else if (action == "config") {
      navigate("/config");
    } else if (action == "profile"){
      navigate("/profile");
    } else if (action == "exam") {
      navigate("/exam")
    }
  };

  return (
    <Drawer variant="permanent" anchor="left" sx={drawerStyles}>
      <List>
        {items.map(({ text, icon, action }) => (
          <ListItemButton
            key={text}
            sx={listItemStyles}
            onClick={() => handleItemClick(action)}
          >
            <ListItemIcon sx={listItemIconStyles}>{icon}</ListItemIcon>
            <ListItemText
              primary={text}
              primaryTypographyProps={{
                sx: { fontSize: "14px", fontWeight: "500" },
              }}
              sx={{ flex: 1, marginLeft: "12px" }}
            />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
