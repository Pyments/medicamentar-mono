import { Box, Card, Grid, IconButton,Typography } from "@mui/material";
import EditOutlinedIcon from '../assets/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from "../assets/icons/DeleteOutlineOutlinedIcon";
import AccessAlarmOutlinedIcon from "../assets/icons/AccessAlarmOutlinedIcon";
import ModalDelete from "./Modals/ModalDelete";
import { useState } from "react";
import { useTheme } from "../constants/theme/useTheme";



const titleCard = {
    color: "#F4FAFE",
    fontSize: "12px",
    textAlign: "center",
    fontWeight: "bold",
    wordBreak: "break-all",
   

    
};

const infoCard = {
    color:"#62636C",
    fontSize:"12px",
    wordWrap: "break-all",
    

}
const cardButton = {
    backgroundColor:"grey.600",
    height:"30px",
    display:"flex", 
    alignItems:"center", 
    justifyContent:"center",
    cursor:"pointer"
};
const CardMedicine = () => {
    const [isModalVisible , setIsModalVisible] = useState(false);
    const { darkMode } = useTheme();
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card
                sx={{
                    width: { xs: "95%", sm: "95%", md: "90%", lg: "99%" },
                    minWidth:"130px",
                    height: 260,
                    backgroundColor: "grey.200",
                    borderRadius:"5px",
                    display:"flex",
                    flexDirection:"column",
                    justifyContent:"space-between"
                }}
            >
                <Box
                    sx={{
                        backgroundColor: darkMode ? "primary.dark" : "primary.light",
                        padding: "2px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
            
                    }}>
                    <IconButton>
                        <EditOutlinedIcon/>
                    </IconButton>
                    <Typography sx={titleCard}>
                        IBUPROFENO
                    </Typography>
                    <IconButton onClick={()=>{setIsModalVisible(true)}}>
                        <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
                    </IconButton>
                </Box>

                <Box sx={{height:"72%", width:"100%", display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                    <Box sx={{ width:"219px", maxWidth:"100%", height: "auto"}}>
                        <Typography sx ={infoCard}>USO CONTÍNUO: NÃO</Typography>
                        <Typography sx ={infoCard}>QUANTIDADE: 20 COMPRIMIDOS</Typography>
                        <Typography sx ={infoCard}>DOSE: 1 COMPRIMIDO</Typography>
                        <Typography sx ={infoCard}>PERÍODO 20/06/2024 A 27/06/2024</Typography>
                        <Typography sx ={infoCard}>VENCIMENTO: 20/06/2024</Typography>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop:"6%"}}>
                        
                        <AccessAlarmOutlinedIcon></AccessAlarmOutlinedIcon>

                        <Typography sx={{ fontWeight: "700", paddingLeft:"5px",fontSize:"12px",textAlign:"center",color: "common.black", }}>20/06 ÀS 14H</Typography>
                    </Box>
                </Box>
                <Box sx={cardButton}>
                    <Typography sx ={{color:"#FFF", fontWeight:"700",fontSize:"8px", textAlign:"center"}}>CLIQUE APÓS TOMAR O MEDICAMENTO</Typography>
                </Box>
            </Card>
            {isModalVisible?<ModalDelete isOpen={isModalVisible} onClose={()=>{setIsModalVisible(false)}}></ModalDelete>:null}
        </Grid>
    );
};

export default CardMedicine;
 