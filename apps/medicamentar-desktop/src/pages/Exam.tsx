import { useState } from "react";
import { Box, Grid, Typography, Button, Stack } from "@mui/material";
import SideBar from "../components/SideBar.tsx";
import Header from "../components/Header.tsx";
import ExamModal from "../components/Modals/ExamModal.tsx";
import { useTheme } from "../constants/theme/useTheme.ts";
import { SectionContainer } from "../components/SectionContainer.tsx";
import CardUniversal from "../components/CardUniversal.tsx";
import { ContainerUniversal } from "../components/ContainerUniversal.tsx";
import { AddBtn } from "@components/AddBtn.tsx";

const Exam = () => {
  const { darkMode } = useTheme();
  const [open, setOpen] = useState<boolean>(false);

  const handleModal = () => {
    setOpen(!open);
  };

  return (
    <ContainerUniversal>
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
              sx={{
                p: 0,
                mt: 0,
                fontSize: "2rem",
                fontWeight: "bold",
                textAlign: { xs: "center", md: "left" },
                color: darkMode ? "common.white" : "primary.main",
              }}
            >
              CONSULTAS E EXAMES
            </Box>
          </Typography>
          <AddBtn handleModal={handleModal} text="consulta ou exame"/>
        </Stack>
        <Grid container spacing={3} pb="75px">
          <CardUniversal
            type="events"
            title="CONSULTA"
            description="CONSULTA MÉDICA - HMPA DR. LULINHA"
            dateTime="12/04 ÀS 14H"
          />
          <CardUniversal
            type="events"
            title="CONSULTA"
            description="CONSULTA MÉDICA - HMPA DR. LULINHA"
            dateTime="12/04 ÀS 14H"
          />
          <CardUniversal
            type="events"
            title="CONSULTA"
            description="CONSULTA MÉDICA - HMPA DR. LULINHA"
            dateTime="12/04 ÀS 14H"
          />
        </Grid>
      </SectionContainer>
      {open && <ExamModal open={open} onClose={handleModal} />}
    </ContainerUniversal>
  );
};

export default Exam;
