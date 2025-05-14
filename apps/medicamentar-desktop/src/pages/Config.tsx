// import { useState } from "react";
import {
  // Box,
  Switch,
  FormGroup,
  IconButton,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import Header from "@components/Header";
import Sidebar from "@components/SideBar";
import Arrow from "@assets/icons/Arrow.svg";
import { useNavigate } from "react-router-dom";
import { SectionContainer } from "@components/SectionContainer";
import { ContainerUniversal } from "@components/ContainerUniversal";
import { useTheme } from "@constants/theme/useTheme";
import { PageTitle } from "@components/PageTitle";

const Config = () => {
  const { darkMode, toggleTheme, largeFont, toggleFontSize } = useTheme();
  /* const [switchStates, setSwitchStates] = useState({
    letrasGigantes: false,
  });
   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSwitchStates({
      ...switchStates,
      [event.target.name]: event.target.checked,
    });
  }; */
  const navigate = useNavigate();

  return (
    <ContainerUniversal>
      <Header />
      <Sidebar />
      <SectionContainer>
        <PageTitle>CONFIGURAÇÕES</PageTitle>
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
                "& .MuiFormControlLabel-label": {
                  fontSize: largeFont ? "1.2rem" : "0.9rem",
                },
              }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={largeFont}
                  onChange={toggleFontSize}
                  name="letrasGigantes"
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
                "& .MuiFormControlLabel-label": {
                  fontSize: largeFont ? "1.2rem" : "0.9rem",
                },
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