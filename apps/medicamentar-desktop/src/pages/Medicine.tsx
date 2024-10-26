import { Box, Typography, Button, Grid, Stack } from "@mui/material";
import Header from "../components/Header.tsx";
import SideBar from "../components/SideBar.tsx";
import { useTheme } from "../constants/theme/useTheme";
import { SectionContainer } from "../components/SectionContainer.tsx";
import CardUniversal from "../components/CardUniversal.tsx";
import { ContainerUniversal } from "../components/ContainerUniversal.tsx";

const Medicine = () => {
  const { darkMode } = useTheme();

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
    </ContainerUniversal>
  );
};

export default Medicine;
