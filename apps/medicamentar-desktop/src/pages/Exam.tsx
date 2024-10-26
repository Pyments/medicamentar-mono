import { useState } from "react";
import { Box, Grid, Typography, Button, Container, Stack } from "@mui/material";
import CardHome from "../components/CardHome.tsx";
import SideBar from "../components/SideBar.tsx";
import Header from "../components/Header.tsx";
import ExamModal from "../components/Modals/ExamModal.tsx";
import { useTheme } from "../constants/theme/useTheme.ts";
import { SectionContainer } from "../components/SectionContainer.tsx";

const Exam = () => {
  const { darkMode } = useTheme();
  const [open, setOpen] = useState<boolean>(false);

  const handleModal = () => {
    setOpen(!open);
  };

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        minWidth: "100%",
        backgroundColor: darkMode ? "primary.main" : "common.white",
      }}
    >
      <Header />
      <SideBar />
      <SectionContainer>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            sx={{
              color: "primary.dark",
            }}
          >
            <Box
              component="h1"
              sx={{
                p: 0,
                mt: 0,
                color: darkMode ? "common.white" : "primary.main",
              }}
            >
              CONSULTAS E EXAMES
            </Box>
          </Typography>
          <Button
            onClick={handleModal}
            sx={{
              backgroundColor: darkMode ? "primary.dark" : "primary.light",
              fontWeight: "bold",
              padding: "14px",
              color: "white",
              fontSize: "14px",
            }}
          >
            + Adicionar Exame ou Consulta
          </Button>
        </Stack>

        <Grid container>
          <CardHome
            titulo="CONSULTA"
            descricao="CONSULTA MÉDICA - HMPA DR. LULINHA"
            dataHora="12/04 ÀS 14H"
          />
          <CardHome
            titulo="EXAME"
            descricao="EXAME DE VISTA - HPMA DR. LULINHA"
            dataHora="12/04 ÀS 11H"
          />
          <CardHome
            titulo="CONSULTA"
            descricao="CONSULTA MÉDICA - HMPA DR. LULINHA"
            dataHora="12/04 ÀS 14H"
          />
        </Grid>
      </SectionContainer>

      {open && <ExamModal open={open} onClose={handleModal} />}
    </Container>
  );
};

export default Exam;
