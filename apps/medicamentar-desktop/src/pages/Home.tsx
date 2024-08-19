import { Box, Grid, Typography, AppBar, Toolbar } from "@mui/material";
import CardHome from "../components/CardHome.tsx";
import SideBar from "../components/SideBar.tsx";

const Home = () => {
    return (
        <Box sx={{ display: "flex", height: "100vh", flexDirection:"column"}}>
            <AppBar position="fixed" sx={{ top: 0, left: 0, width: '100%', backgroundColor: "primary.main", zIndex: 1201 }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        MEDICAMENTAR
                    </Typography>
                </Toolbar>
            </AppBar>

            <SideBar/>

            <Box
                sx={{
                    display: "flex",
                    marginTop: "60px",
                }}
            >
                <Box sx={{ paddingTop: 8}}>
                    <Typography sx={{ color: "primary.dark", marginLeft:3}}>
                        <h1>EVENTOS PRÓXIMOS</h1>
                    </Typography>

                    <Grid container spacing={3} rowSpacing={8} sx={{
                        maxWidth: 1150,
                        margin: "auto",
                    }}>
                        <CardHome titulo="VOCÊ TEM UM EVENTO SE APROXIMANDO!" descricao="CONSULTA MÉDICA - HMPA DR. LULINHA" dataHora="12/04 ÀS 14H" />
                        <CardHome titulo="HORA DO MEDICAMENTO!" descricao="IBUPROFENO 1 COMPRIMIDO" dataHora="12/04 ÀS 11H" />
                        <CardHome titulo="VOCÊ TEM UM EVENTO SE APROXIMANDO!" descricao="CONSULTA MÉDICA - HMPA DR. LULINHA" dataHora="12/04 ÀS 14H" />
                        <CardHome titulo="HORA DO MEDICAMENTO!" descricao="IBUPROFENO 1 COMPRIMIDO" dataHora="12/04 ÀS 11H" />
                        <CardHome titulo="HORA DO MEDICAMENTO!" descricao="IBUPROFENO 1 COMPRIMIDO" dataHora="12/04 ÀS 11H" />
                        <CardHome titulo="HORA DO MEDICAMENTO!" descricao="IBUPROFENO 1 COMPRIMIDO" dataHora="12/04 ÀS 14H" />
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}

export default Home;