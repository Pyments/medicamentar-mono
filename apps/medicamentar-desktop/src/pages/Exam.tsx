import { useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import SideBar from "../components/SideBar.tsx";
import Header from "../components/Header.tsx";
import ExamModal from "../components/Modals/ExamModal.tsx";
import CardUniversal from "../components/CardUniversal.tsx";

const Exam = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
      <Header />
      <SideBar />
      <Box
        sx={{
          margin: "2%",
          flex: 1,
          marginTop: "170px",
          height: "80%",
          maxWidth: "70%",
          scrollbarWidth: "none",
          borderWidth: "none",
        }}
      >
        <Typography
          sx={{ color: "primary.dark", marginBottom: "4%", marginLeft: "2%" }}
        >
          <h1>CONSULTAS E EXAMES</h1>
        </Typography>

        <Button
          onClick={handleOpenModal}
          sx={{
            backgroundColor: "#91C7EF",
            flexDirection: "row",
            fontWeight: "bold",
            padding: "14px",
            boxShadow: "none",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            marginLeft: "80%",
            bottom: "100px",
            color: "white",
            fontSize: "14px",
          }}
        >
          + Adicionar Exame ou Consulta
        </Button>

        <Grid
          container
          spacing={2}
          sx={{
            flex: 1,
            margin: "auto",
          }}
        >
          <CardUniversal
            type={"events"}
            title="CONSULTA"
            description="CONSULTA MÉDICA - HMPA DR. LULINHA"
            dateTime="12/04 ÀS 14H"
          />
          <CardUniversal
            type={"events"}
            title="EXAME"
            description="EXAME DE VISTA - HPMA DR. LULINHA"
            dateTime="12/04 ÀS 11H"
          />
          <CardUniversal
            type={"events"}
            title="CONSULTA"
            description="CONSULTA MÉDICA - HMPA DR. LULINHA"
            dateTime="12/04 ÀS 14H"
          />
        </Grid>
      </Box>

      {isModalOpen && <ExamModal />}
    </Box>
  );
};

export default Exam;
