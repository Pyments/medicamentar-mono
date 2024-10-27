import { Box, Grid, Typography } from "@mui/material";
import Header from "../components/Header.tsx";
import SideBar from "../components/SideBar.tsx";
import CardUniversal from "../components/CardUniversal.tsx";

import { useTheme } from "../constants/theme/useTheme";
import { SectionContainer } from "../components/SectionContainer.tsx";
import { ContainerUniversal } from "../components/ContainerUniversal.tsx";

const Home = () => {
  const { darkMode } = useTheme();

  return (
    <ContainerUniversal>
      <Header />
      <SideBar />
      <SectionContainer>
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
            EVENTOS PRÓXIMOS
          </Box>
        </Typography>
        <Grid container spacing={3} pb="75px">
          <CardUniversal
            type={"events"}
            title={"VOCÊ TEM UM EVENTO SE APROXIMANDO!"}
            description={"CONSULTA MÉDICA - HMPA DR. LULINHA"}
            dateTime={"12/04 ÀS 11H"}
          />
          <CardUniversal
            type={"events"}
            title={"VOCÊ TEM UM MEDICAMENTO SE APROXIMANDO!"}
            description={"IBUPROFENO 1 COMPRIMIDO"}
            dateTime={"12/04 ÀS 11H"}
          />
          <CardUniversal
            type={"events"}
            title={"VOCÊ TEM UM MEDICAMENTO SE APROXIMANDO!"}
            description={"CONSULTA MÉDICA - HMPA DR. LULINHA"}
            dateTime={"12/04 ÀS 11H"}
          />
          <CardUniversal
            type={"events"}
            title={"HORA DO MEDICAMENTO!"}
            description={"IBUPROFENO 1 COMPRIMIDO"}
            dateTime={"12/04 ÀS 11H"}
          />
          <CardUniversal
            type={"events"}
            title={"HORA DO MEDICAMENTO!"}
            description={"IBUPROFENO 1 COMPRIMIDO"}
            dateTime={"12/04 ÀS 11H"}
          />
          <CardUniversal
            type={"events"}
            title={"HORA DO MEDICAMENTO"}
            description={"IBUPROFENO 1 COMPRIMIDO"}
            dateTime={"12/04 ÀS 11H"}
          />
          <CardUniversal
            type={"events"}
            title={"HORA DO MEDICAMENTO"}
            description={"IBUPROFENO 1 COMPRIMIDO"}
            dateTime={"12/04 ÀS 11H"}
          />
          <CardUniversal
            type={"events"}
            title={"HORA DO MEDICAMENTO"}
            description={"IBUPROFENO 1 COMPRIMIDO"}
            dateTime={"12/04 ÀS 11H"}
          />
          <CardUniversal
            type={"events"}
            title={"HORA DO MEDICAMENTO"}
            description={"IBUPROFENO 1 COMPRIMIDO"}
            dateTime={"12/04 ÀS 11H"}
          />
          <CardUniversal
            type={"events"}
            title={"HORA DO MEDICAMENTO"}
            description={"IBUPROFENO 1 COMPRIMIDO"}
            dateTime={"12/04 ÀS 11H"}
          />
          <CardUniversal
            type={"events"}
            title={"HORA DO MEDICAMENTO"}
            description={"IBUPROFENO 1 COMPRIMIDO"}
            dateTime={"12/04 ÀS 11H"}
          />
          <CardUniversal
            type={"events"}
            title={"HORA DO MEDICAMENTO"}
            description={"IBUPROFENO 1 COMPRIMIDO"}
            dateTime={"12/04 ÀS 11H"}
          />
          <CardUniversal
            type={"events"}
            title={"HORA DO MEDICAMENTO"}
            description={"IBUPROFENO 1 COMPRIMIDO"}
            dateTime={"12/04 ÀS 11H"}
          />
          <CardUniversal
            type={"events"}
            title={"HORA DO MEDICAMENTO"}
            description={"IBUPROFENO 1 COMPRIMIDO"}
            dateTime={"12/04 ÀS 11H"}
          />
          <CardUniversal
            type={"events"}
            title={"HORA DO MEDICAMENTO"}
            description={"IBUPROFENO 1 COMPRIMIDO"}
            dateTime={"12/04 ÀS 11H"}
          />
          <CardUniversal
            type={"events"}
            title={"HORA DO MEDICAMENTO"}
            description={"IBUPROFENO 1 COMPRIMIDO"}
            dateTime={"12/04 ÀS 11H"}
          />
          <CardUniversal
            type={"events"}
            title={"HORA DO MEDICAMENTO"}
            description={"IBUPROFENO 1 COMPRIMIDO"}
            dateTime={"12/04 ÀS 11H"}
          />
          <CardUniversal
            type={"events"}
            title={"HORA DO MEDICAMENTO"}
            description={"IBUPROFENO 1 COMPRIMIDO"}
            dateTime={"12/04 ÀS 11H"}
          />
        </Grid>
      </SectionContainer>
    </ContainerUniversal>
  );
};

export default Home;
