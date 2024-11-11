import { useState } from "react";
import { Box, Typography, Button, Grid, Stack } from "@mui/material";

import Header from "@components/Header.tsx";
import SideBar from "@components/SideBar.tsx";
import CardUniversal from "@components/CardUniversal.tsx";
import { SectionContainer } from "@components/SectionContainer.tsx";
import ModalMedicineType from "@components/Modals/ModalMedicineType";
import { ContainerUniversal } from "@components/ContainerUniversal.tsx";

import { useTheme } from "@theme/useTheme";
import ModalNewMedication from "@components/Modals/ModalNewMedication";

const Medicine = () => {
  const { darkMode } = useTheme();
  const [openType, setOpenType] = useState<boolean>(false);
  const [openNew, setOpenNew] = useState<boolean>(false);
  const [type, setType] = useState<string>("");

  const handleModal = () => {
    setOpenType(!openType);
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
              component="h1"
              sx={{
                p: 0,
                mt: 0,
                color: darkMode ? "common.white" : "primary.main",
              }}
            >
              MEDICAMENTOS
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
            + ADICIONAR MEDICAMENTO
          </Button>
        </Stack>
        <Grid container spacing={3} pb="75px">
          <CardUniversal
            type={"medication"}
            continuousUse={"SIM"}
            qtpDose={"10 COMPRIMIDOS"}
            dose={"1 COMPRIMIDO"}
            title={"CARD UNIVERSAL"}
            period={"20/06/2024 A 27/06/2024"}
            expirationDate={"20/06/2024"}
            dateTime={"20/06 ÀS 14H"}
          ></CardUniversal>
          <CardUniversal
            type={"medication"}
            continuousUse={"SIM"}
            qtpDose={"10 COMPRIMIDOS"}
            dose={"1 COMPRIMIDO"}
            title={"CARD UNIVERSAL"}
            period={"20/06/2024 A 27/06/2024"}
            expirationDate={"20/06/2024"}
            dateTime={"20/06 ÀS 14H"}
          ></CardUniversal>
          <CardUniversal
            type={"medication"}
            continuousUse={"SIM"}
            qtpDose={"10 COMPRIMIDOS"}
            dose={"1 COMPRIMIDO"}
            title={"CARD UNIVERSAL"}
            period={"20/06/2024 A 27/06/2024"}
            expirationDate={"20/06/2024"}
            dateTime={"20/06 ÀS 14H"}
          ></CardUniversal>
          <CardUniversal
            type={"medication"}
            continuousUse={"SIM"}
            qtpDose={"10 COMPRIMIDOS"}
            dose={"1 COMPRIMIDO"}
            title={"CARD UNIVERSAL"}
            period={"20/06/2024 A 27/06/2024"}
            expirationDate={"20/06/2024"}
            dateTime={"20/06 ÀS 14H"}
          ></CardUniversal>
          <CardUniversal
            type={"medication"}
            continuousUse={"SIM"}
            qtpDose={"10 COMPRIMIDOS"}
            dose={"1 COMPRIMIDO"}
            title={"CARD UNIVERSAL"}
            period={"20/06/2024 A 27/06/2024"}
            expirationDate={"20/06/2024"}
            dateTime={"20/06 ÀS 14H"}
          ></CardUniversal>
          <CardUniversal
            type={"medication"}
            continuousUse={"SIM"}
            qtpDose={"10 COMPRIMIDOS"}
            dose={"1 COMPRIMIDO"}
            title={"CARD UNIVERSAL"}
            period={"20/06/2024 A 27/06/2024"}
            expirationDate={"20/06/2024"}
            dateTime={"20/06 ÀS 14H"}
          ></CardUniversal>
          <CardUniversal
            type={"medication"}
            continuousUse={"SIM"}
            qtpDose={"10 COMPRIMIDOS"}
            dose={"1 COMPRIMIDO"}
            title={"CARD UNIVERSAL"}
            period={"20/06/2024 A 27/06/2024"}
            expirationDate={"20/06/2024"}
            dateTime={"20/06 ÀS 14H"}
          ></CardUniversal>
          <CardUniversal
            type={"medication"}
            continuousUse={"SIM"}
            qtpDose={"10 COMPRIMIDOS"}
            dose={"1 COMPRIMIDO"}
            title={"CARD UNIVERSAL"}
            period={"20/06/2024 A 27/06/2024"}
            expirationDate={"20/06/2024"}
            dateTime={"20/06 ÀS 14H"}
          ></CardUniversal>
          <CardUniversal
            type={"medication"}
            continuousUse={"SIM"}
            qtpDose={"10 COMPRIMIDOS"}
            dose={"1 COMPRIMIDO"}
            title={"CARD UNIVERSAL"}
            period={"20/06/2024 A 27/06/2024"}
            expirationDate={"20/06/2024"}
            dateTime={"20/06 ÀS 14H"}
          ></CardUniversal>
        </Grid>
      </SectionContainer>
      {openType && (
        <ModalMedicineType
          open={openType}
          setOpen={setOpenType}
          setOpenNew={setOpenNew}
          setType={setType}
        />
      )}
      {openNew && (
        <ModalNewMedication type={type} open={openNew} setOpen={setOpenNew} />
      )}
    </ContainerUniversal>
  );
};

export default Medicine;
