import { Box, Typography, Button, Grid } from "@mui/material";
import SideBar from "../components/SideBar.tsx";
import Header from "../components/Header.tsx";
import Add_Icon from "../assets/icons/Add_Icon.tsx";
import CardMedicine from "../components/CardMedicine.tsx";
import { useTheme } from "../constants/theme/useTheme";


const Medicine = () => {
const { darkMode } = useTheme();

  return (
    <Box sx={{ 
      display: "flex", 
      width: "100%",
      height:"100%",
      overflow:"hidden",
      backgroundColor: darkMode ? "primary.main" : "common.white",
    }}>
      <Header />
      <SideBar />
      <Box sx={{
        width:"100%",
        margin: "3%",
        marginTop: "5%",
        paddingTop: "84px",
      }}>
      <Box
        sx={{
          display: "flex",
          flexDirection:{xs:"column",md:"row"},
          alignItems: {xs:"flex-start",sm:"flex-start"},
          justifyContent: { xs: "flex-start", sm: "space-between" },
          width: "100%",
        }}
      >
        <Typography
          sx={{
            color: darkMode ? "common.white" : "primary.main",
            marginRight: { sm: "15px" },
          }}
        >
          <h1>MEDICAMENTOS</h1>
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#91C7EF",
            fontWeight: "bold",
            padding: "14px",
            boxShadow: "none",
            display: "flex",
            alignItems: "center",
            marginTop: "10px",
            marginBottom: {xs:"19px"},
            width:{md:"auto",sm:"auto", xs:"100%"},
            height:"50px",
            overflow:"hidden",

          }}
        >
          <Box
            sx={{
              marginRight: "8px",
              marginTop: "5px",
              width: "24px",
              height: "24px", 
            }}
          >
            <Add_Icon />
          </Box>
          <Typography sx ={{fontWeight:"bold", fontSize:"13px",wordBreak: "break-word", overflow:"hidden"}}>
        ADICIONAR MEDICAMENTO
          </Typography>
        </Button>
           
      </Box>
      <Box sx ={{
          flex: 1,
          padding: 1,
          paddingBottom:"100px",
          height: "80%",
          overflow: "hidden",
          maxWidth: "100%",
          overflowY: "auto",

        }}>
          <Grid container spacing={5}>  
            <CardMedicine/> 
            <CardMedicine/> 
            <CardMedicine/> 
        </Grid>
      </Box>
      </Box>
    </Box>
  );
};

export default Medicine;
