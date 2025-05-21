import {
  Box,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";

import { useState } from "react";
import { useAuth } from "@hooks/useAuth";

import LogoutModal from "./Modals/LogoutModal";
import Pill_Icon from "@assets/icons/Pill_Icon";
import Timer_Icon from "@assets/icons/Timer_Icon";
import Config_Icon from "@assets/icons/Config_Icon";
import Logout_Icon from "@assets/icons/Logout_Icon";
import Profile_Icon from "@assets/icons/Profile_Icon";
import Stethoscope_Icon from "@assets/icons/Stethoscope_Icon";

import Dark_Pill_Icon from "@assets/icons/Dark_Pill_Icon.svg";
import Dark_Timer_Icon from "@assets/icons/Dark_Timer_Icon.svg";
import Dark_Config_Icon from "@assets/icons/Dark_Config_Icon.svg";
import Dark_Logout_Icon from "@assets/icons/Dark_Logout_Icon.svg";
import Dark_Profile_Icon from "@assets/icons/Dark_Profile_Icon.svg";
import Dark_Stethoscope_Icon from "@assets/icons/Dark_Stethoscope_Icon.svg";

import { useNavigate } from "react-router-dom";
import { useTheme } from "@constants/theme/useTheme";

const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const { darkMode, largeFont } = useTheme();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const onExit = async () => {
    await window.electron.store.delete("email");
    await window.electron.store.delete("password");
    await logout();
  };

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
      action: "exam",
    },
    {
      text: "MEDICAMENTOS",
      icon: darkMode ? <img src={Dark_Pill_Icon} /> : <Pill_Icon />,
      action: "medicine",
    },
    {
      text: "PERFIL",
      icon: darkMode ? <img src={Dark_Profile_Icon} /> : <Profile_Icon />,
      action: "profile",
    },
    {
      text: "CONFIGURAÇÕES",
      icon: darkMode ? <img src={Dark_Config_Icon} /> : <Config_Icon />,
      action: "config",
    },
  ];
  const drawerStyles = {
    left: 0,
    top: 100,
    pt: { xs: "0", sm: "13px", md: "30px" },
    zIndex: 1200,
    borderRight: "none",
    position: "absolute",
    boxSizing: "border-box",
    height: "calc(100% - 100px)",
    transition: "all 200ms ease-out",
    width: { xs: "75px", md: "300px" },
    backgroundColor: darkMode ? "primary.dark" : "grey.100",
  };

  const listItemStyles = {
    "&:hover": {
      backgroundColor: darkMode ? "primary.main" : "primary.lighter",
    },
    p: "10px 8px",
    m: "auto 0",
    transition: "all 200ms ease-out",
  };

  const listItemIconStyles = {
    display: "flex",
    justifyContent: "center",
  };

  const handleItemClick = async (action: string | undefined) => {
    if (action === "events") {
      navigate("/home");
    } else if (action === "medicine") {
      navigate("/medicine");
    } else if (action == "config") {
      navigate("/config");
    } else if (action == "profile") {
      navigate("/profile");
    } else if (action == "exam") {
      navigate("/exam");
    }
  };

  return (
    <Box component="aside" sx={drawerStyles}>
      <List
        sx={{
          transition: "width 200ms ease-out",
          width: { xs: "75px", md: "300px" },
        }}
      >
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
                sx: {
                  fontWeight: "500",
                  fontSize: largeFont ? "1.1rem" : "0.9rem",
                },
              }}
              sx={{
                flex: 1,
                marginLeft: "12px",
                textWrap: "nowrap",
                wordWrap: "break-word",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                display: { xs: "none", md: "block" },
                color: darkMode ? "common.white" : "common.black",
              }}
            />
          </ListItemButton>
        ))}
        {/*Logout Button & Modal*/}
        <ListItemButton sx={listItemStyles} onClick={() => setIsOpen(true)}>
          <ListItemIcon sx={listItemIconStyles}>
            {darkMode ? <img src={Dark_Logout_Icon} /> : <Logout_Icon />}
          </ListItemIcon>
          <ListItemText
            primary={"SAIR"}
            primaryTypographyProps={{
              sx: {
                fontSize: "14px",
                fontWeight: "500",
              },
            }}
            sx={{
              flex: 1,
              marginLeft: "12px",
              textWrap: "nowrap",
              wordWrap: "break-word",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              display: { xs: "none", md: "block" },
              color: darkMode ? "common.white" : "common.black",
            }}
          />
        </ListItemButton>
      </List>
      <LogoutModal isOpen={isOpen} onClose={onClose} onExit={onExit} />
    </Box>
  );
};

export default Sidebar;
