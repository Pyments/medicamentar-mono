import { Box, Grid, Typography, AppBar, Toolbar } from "@mui/material";
import CardHome from "../components/CardHome.tsx";
import SideBar from "../components/SideBar.tsx";
import ThemeSwitcherButton from "../components/ThemeSwitcherButton.tsx"
const Home = () => {
    return (
        <Box sx={{ 
            display:"flex",
            width:"100vw",
            height:"100%",
             }}>
            <AppBar position="fixed" sx={{ top: 0, left: 0, width: '100%', backgroundColor: "primary.main", zIndex: 1201 }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        MEDICAMENTAR
                    </Typography>
                    <ThemeSwitcherButton />
                </Toolbar>
            </AppBar>
            <SideBar/>
                <Box 
                sx={{ 
                    margin:"3%",   
                    marginTop:"4%"
                }}>
                    <Typography 
                    sx={{ 
                        color: "primary.dark", 
                        marginBottom:"4%"
                    }}>
                        <h1>EVENTOS PRÓXIMOS</h1>
                    </Typography>

                    <Box>
                        <Grid container spacing={2} rowSpacing={8}>
                            
                        <CardHome 
                        titulo="VOCÊ TEM UM EVENTO SE APROXIMANDO!" 
                        descricao="CONSULTA MÉDICA - HMPA DR. LULINHA" 
                        dataHora="12/04 ÀS 14H" />
                        <CardHome 
                        titulo="HORA DO MEDICAMENTO!" 
                        descricao="IBUPROFENO 1 COMPRIMIDO" 
                        dataHora="12/04 ÀS 11H" />
                        <CardHome 
                        titulo="VOCÊ TEM UM EVENTO SE APROXIMANDO!" 
                        descricao="CONSULTA MÉDICA - HMPA DR. LULINHA" 
                        dataHora="12/04 ÀS 14H" />

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