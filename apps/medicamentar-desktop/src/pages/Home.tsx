import { Box, Grid, Typography } from "@mui/material";
import CardHome from "../components/CardHome.tsx";
import SideBar from "../components/SideBar.tsx";
import Header from "../components/Header.tsx";

const Home = () => {
  return (
    <Box
    sx={{
      display: "flex",
      width: "100vw",
      height: "100vh",
    }}
  >
    <Header />
    <SideBar />
    <Box
      sx={{
        margin: "3%",
        flex: 1,
        marginTop: "170px",
        padding:1,
        height: "80%",
        overflow: "hidden",
        maxWidth: "100%",
        overflowY:"auto",
        scrollbarWidth: "none", 
      }}
    >
      <Typography
        sx={{
          color: "primary.dark",
          marginBottom: "4%",
        }}>

        <h1>EVENTOS PRÓXIMOS</h1>
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
            <CardHome
              titulo="HORA DO MEDICAMENTO!"
              descricao="IBUPROFENO 1 COMPRIMIDO"
              dataHora="12/04 ÀS 14H"
            />
          </Grid>
        </Box>
      </Box> 
  );
};

export default Home;
