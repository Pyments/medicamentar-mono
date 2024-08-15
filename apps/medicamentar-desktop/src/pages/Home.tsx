import { useNavigate } from "react-router-dom";
import {Box, Button, Grid, Typography} from "@mui/material";
import CardHome from "../components/CardHome";

const Home = () => {
    const navigate = useNavigate();
    const handleBack = () =>{
        navigate(-1);
    }
    return(
        <Box sx={{
            height:"100vh",
            width:"100%",
            backgroundColor:"grey.50",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center"
       
          }}>

            <Box sx ={{
                marginTop:"75px",
                alignItems:"center",


            }}>
            <Typography sx = {{color:"primary.dark", marginLeft:3}}>
                <h1>EVENTOS PRÓXIMOS</h1>
            </Typography>

            <Grid container spacing={3} sx ={{
                maxWidth:1050,
                alignItems:"center",
                justifyContent:"center",
                margin: "auto",


            }}>
            <CardHome titulo="VOCÊ TEM UM EVENTO SE APROXIMANDO!" descricao="CONSULTA MÉDICA - HMPA DR. LULINHA" dataHora="12/04 ÀS 14H"></CardHome>
            <CardHome titulo="HORA DO MEDICAMENTO!" descricao="IBUPROFENO 1 COMPRIMIDO" dataHora="12/04 ÀS 11H"></CardHome>
            <CardHome titulo="VOCÊ TEM UM EVENTO SE APROXIMANDO!" descricao="CONSULTA MÉDICA - HMPA DR. LULINHA" dataHora="12/04 ÀS 14H"></CardHome>
            <CardHome titulo="HORA DO MEDICAMENTO!" descricao="IBUPROFENO 1 COMPRIMIDO" dataHora="12/04 ÀS 11H"></CardHome>
            <CardHome titulo="HORA DO MEDICAMENTO!" descricao="IBUPROFENO 1 COMPRIMIDO" dataHora="12/04 ÀS 11H"></CardHome>
            <CardHome titulo="HORA DO MEDICAMENTO!" descricao="IBUPROFENO 1 COMPRIMIDO" dataHora="12/04 ÀS 14H"></CardHome>

            </Grid>
            </Box>
            
            <Button variant="contained" color="primary" onClick={handleBack} sx = {{width:50, margin:5, padding:1}}> Voltar</Button>
        </Box>
    );
}
export default Home;