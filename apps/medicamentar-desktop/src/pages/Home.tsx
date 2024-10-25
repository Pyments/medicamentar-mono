import { Box, Container, Grid, Typography } from "@mui/material";
import CardHome from "../components/CardHome.tsx";
import SideBar from "../components/SideBar.tsx";
import Header from "../components/Header.tsx";

import { useTheme } from "../constants/theme/useTheme";
import CardUniversal from "../components/CardUniversal.tsx";

const Home = () => {
  const { darkMode } = useTheme();

  return (
    <Container
      sx={{
        ml: 0,
        mr: "auto",
        height: "100vh",
        display: "flex",
        minWidth: "100%",
        overflow:"hidden",
        backgroundColor: darkMode ? "primary.main" : "common.white",
      }}
    >
      <Header />
      <SideBar />
      <Box
        sx={{
          margin: "3%",
          flex: 1,
          marginTop: "170px",
          padding: 1,
          height: "80%",
          overflow: "hidden",
          maxWidth: "1100px",
          overflowY: "auto",
          paddingBottom:"100px",
        }}
      >
        <Typography
          sx={{
            color: "primary.dark",
            marginBottom: "4%",
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
        <Grid container spacing={2}>
          <CardHome
            titulo="VOCÊ TEM UM EVENTO SE APROXIMANDO!"
            descricao="CONSULTA MÉDICA - HMPA DR. LULINHA"
            dataHora="12/04 ÀS 14H"
          />
          <CardHome
            titulo="HORA DO MEDICAMENTO!"
            descricao="IBUPROFENO 1 COMPRIMIDO"
            dataHora="12/04 ÀS 11H"
          />
          <CardHome
            titulo="VOCÊ TEM UM EVENTO SE APROXIMANDO!"
            descricao="CONSULTA MÉDICA - HMPA DR. LULINHA"
            dataHora="12/04 ÀS 14H"
          />
          <CardHome
            titulo="HORA DO MEDICAMENTO!"
            descricao="IBUPROFENO 1 COMPRIMIDO"
            dataHora="12/04 ÀS 11H"
          />
          <CardHome
            titulo="HORA DO MEDICAMENTO!"
            descricao="IBUPROFENO 1 COMPRIMIDO"
            dataHora="12/04 ÀS 11H"
          />
          <CardUniversal type={"events"} title={"HORA DO MEDICAMENTO"} description={"IBUPROFENO 1 COMPRIMIDO"} dateTime={"12/04 ÀS 11H"}></CardUniversal>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
