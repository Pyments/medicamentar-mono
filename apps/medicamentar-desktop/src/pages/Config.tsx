import {
  Box,
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
  const navigate = useNavigate();

  return (
    <ContainerUniversal>
      <Header />
      <Sidebar />
      <SectionContainer>
        <Box
          sx={{
            fontSize: largeFont ? "2.2rem" : "2rem",
            fontWeight: "bold",
            color: darkMode ? "text.primary" : "primary.darker",
          }}
        >
          <PageTitle>CONFIGURAÇÕES</PageTitle>
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
                  checked={largeFont}
                  onChange={toggleFontSize}
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