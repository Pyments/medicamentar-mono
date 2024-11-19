import {
  Box,
  Switch,
  FormGroup,
  IconButton,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import Header from "@components/Header";
import Sidebar from "@components/SideBar";
import Arrow from "@assets/icons/Arrow.svg";
import { useNavigate } from "react-router-dom";
import { SectionContainer } from "@components/SectionContainer";
import { ContainerUniversal } from "@components/ContainerUniversal";

import { useTheme } from "@constants/theme/useTheme";

const Config = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [switchStates, setSwitchStates] = useState({
    letrasGigantes: false,
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSwitchStates({
      ...switchStates,
      [event.target.name]: event.target.checked,
    });
  };
  const navigate = useNavigate();
  return (
    <ContainerUniversal>
      <Header />
      <Sidebar />
      <SectionContainer>
        <Box
          sx={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: darkMode ? "text.primary" : "primary.darker",
          }}
        >
          CONFIGURAÇÕES
        </Box>
        <FormControl component="fieldset" variant="standard">
          <FormGroup sx={{ gap: "20px", width: "300px" }}>
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={toggleTheme}
                  name="temaEscuro"
                  aria-label="Tema Escuro"
                />
              }
              label="TEMA ESCURO"
              labelPlacement="start"
              sx={{
                backgroundColor: darkMode
                  ? "text.secondary"
                  : "background.paper",
                borderRadius: "5px",
                padding: "11px 30px",
                justifyContent: "space-between",
              }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={switchStates.letrasGigantes}
                  onChange={handleChange}
                  name="letrasGigantes"
                  aria-label="Letras Gigantes"
                />
              }
              label="LETRAS GIGANTES"
              labelPlacement="start"
              sx={{
                backgroundColor: darkMode
                  ? "text.secondary"
                  : "background.paper",
                borderRadius: "5px",
                padding: "11px 30px",
                justifyContent: "space-between",
              }}
            />
            <FormControlLabel
              control={
                <IconButton
                  aria-label="Histórico"
                  sx={{ pr: "25px" }}
                  onClick={() => navigate("/history")}
                >
                  <img src={Arrow} />
                </IconButton>
              }
              label="HISTÓRICO"
              labelPlacement="start"
              sx={{
                backgroundColor: darkMode
                  ? "text.secondary"
                  : "background.paper",
                borderRadius: "5px",
                padding: "11px 30px",
                justifyContent: "space-between",
              }}
            />
          </FormGroup>
        </FormControl>
      </SectionContainer>
    </ContainerUniversal>
  );
};

export default Config;
