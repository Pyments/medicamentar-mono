import { useState } from "react";
import Header from "@components/Header";
import SideBar from "@components/SideBar";
import { AddBtn } from "@components/AddBtn";
import ExamModal from "@components/Modals/ExamModal";
import CardUniversal from "@components/CardUniversal";
import { Box, Grid, Typography, Stack } from "@mui/material";
import { SectionContainer } from "@components/SectionContainer";
import { ContainerUniversal } from "@components/ContainerUniversal";

import { useTheme } from "@constants/theme/useTheme";

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
          <AddBtn handleModal={handleModal} text="consulta ou exame" />
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
