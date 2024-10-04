import { Box, Card, Grid, IconButton,Typography } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import ModalDelete from "./ModalDelete";
import { useState } from "react";

const titleCard = {
    color: "#F4FAFE",
    fontSize: "12px",
    textAlign: "center",
    fontWeight: "bold",
    wordBreak: "break-all",
   

    
};
const iconStyle = {
    color: "#F4FAFE",
};
const infoCard = {
    color:"#62636C",
    fontSize:"12px",
    wordWrap: "break-word",
    

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
    return (
        <Grid item xs={14} sm={6} md={4} sx={{minHeight:"261px"}}>
            <Card
                sx={{
    
                    width:"300px",
                    maxWidth:"100%",
                    height: "260px",
                    backgroundColor: "grey.200",
                    borderRadius:"5px",
                }}
            >
                <Box
                    sx={{
                        backgroundColor: "primary.light",
                        padding: "2px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
            
                    }}>
                    <IconButton>
                        <EditOutlinedIcon sx={iconStyle} />
                    </IconButton>
                    <Typography sx={titleCard}>
                        IBUPROFENO
                    </Typography>
                    <IconButton onClick={()=>{setIsModalVisible(true)}}>
                        <DeleteOutlineOutlinedIcon sx={iconStyle} />
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

                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width:"109px", marginTop:"6%"}}>
                        <AccessAlarmOutlinedIcon sx={{width:"17px,", height:"16px"}}/>
                        <Typography sx={{ fontWeight: "700", paddingLeft:"5px",fontSize:"12px",textAlign:"center" }}>20/06 ÀS 14H</Typography>
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
