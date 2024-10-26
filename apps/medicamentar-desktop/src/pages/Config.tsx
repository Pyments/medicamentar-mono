import {
  Box,
  Container,
  FormControl,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import { useState } from "react";
import { useTheme } from "../constants/theme/useTheme";
import { SectionContainer } from "../components/SectionContainer";

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
  return (
    <Container
      sx={{
        display: "flex",
        backgroundColor: darkMode ? "primary.main" : "common.white",
        height: "100vh",
        minWidth: "100%",
      }}
    >
      <Header />
      <Sidebar />
      <SectionContainer>
        <Box
          component="h1"
          sx={{ color: darkMode ? "text.primary" : "primary.darker" }}
        >
          Configurações
        </Box>
        <FormControl component="fieldset" variant="standard">
          <FormGroup sx={{ gap: "20px" }}>
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={toggleTheme}
                  name="temaEscuro"
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
                gap: "41px",
              }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={switchStates.letrasGigantes}
                  onChange={handleChange}
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
                gap: "18px",
              }}
            />
          </FormGroup>
        </FormControl>
      </SectionContainer>
    </Container>
  );
};

export default Config;
