import { Box, Card, Grid, IconButton, Typography } from "@mui/material";
import EditOutlinedIcon from '../assets/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from "../assets/icons/DeleteOutlineOutlinedIcon";
import AccessAlarmOutlinedIcon from "../assets/icons/AccessAlarmOutlinedIcon";
import { useTheme } from "../constants/theme/useTheme";
import ModalDelete from "./Modals/ModalDelete";
import ModalEditMedicine from "./Modals/ModalEditMedicine";
import { useState } from "react";


interface CardUniversalProps{
    type: "medication" | "events";
    title:string;
    continuousUse?:string;
    dose?:string;
    qtpDose?:string;
    period?:string;
    expirationDate?:string;
    dateTime:string;
    description?:string;
}

const CardUniversal:React.FC<CardUniversalProps>=({type,title,continuousUse,dose,qtpDose,period,expirationDate,dateTime,description})=>{
    const { darkMode } = useTheme();
    const [isModalDeleteVisible , setIsModalDeleteVisible] = useState(false);
    const [isModalEditVisible, setIsModalEditVisible] = useState(false);
    const isMedication = type ==="medication";
    const isEvents = type ==="events";
    const onEdit = ()=> {setIsModalEditVisible(true)};
    const onDelete =()=>{setIsModalDeleteVisible(true)};


    const titleCard = {
        fontSize: "12px",
        textAlign: "center",
        fontWeight: "bold",
        wordWrap: "break-word",   
        minWidth:"30%", 
        maxHeigth:"50px",
        marginInline:"5%"        
    };
    const cardButton = {
        height:"30px",
        display:"flex", 
        alignItems:"center", 
        justifyContent:"center",
        cursor:"pointer",
        boxShadow: "none",
    };
    
    const infoCard = {  
        fontSize:"12px",
        wordWrap: "break-word",
        color:darkMode?"common.black":"common.black",
        }


    return(
        <Grid item xs={12} sm={6} md={4}>
            {isMedication &&(
            <Card sx ={{ 
                maxWidth:"300px",
                width: { xs: "95%", sm: "95%", md: "90%", lg: "99%" },
                minWidth:"120px",
                minHeight: 260,
                backgroundColor: darkMode?"text.secondary":"background.paper",
                borderRadius:"5px",
                display:"flex",
                flexDirection:"column",
                justifyContent:"space-between",
                boxShadow: "none",
}}>
                <Box sx={{
                        backgroundColor: darkMode ? "primary.dark" : "primary.light",
                        padding: "2px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        maxHeight:"100px"
                        
                        }}>
                    
                        <IconButton onClick={onEdit}>
                            <EditOutlinedIcon/>
                        </IconButton>
                 
                    <Typography sx={{...titleCard, color: darkMode ?"text.primary" : "background.default"}}>
                        {title}
                    </Typography>
                  
                        <IconButton onClick={onDelete}>
                            <DeleteOutlineOutlinedIcon/>
                        </IconButton>
                   
                </Box>
                <Box sx={{
                    height:"72%", 
                    width:"100%", 
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    justifyContent:"center"
                }}>
                    <Box sx={{ 
                        width:"219px", 
                        maxWidth:"100%", 
                        }}>
                          <Typography sx ={infoCard}>USO CONTÍNUO: {continuousUse}</Typography>
                          <Typography sx ={infoCard}>QUANTIDADE: {qtpDose}</Typography>  
                          <Typography sx ={infoCard}>DOSE: {dose}</Typography>
                          <Typography sx ={infoCard}>PERÍODO: {period}</Typography>
                          <Typography sx ={infoCard}>VENCIMENTO: {expirationDate}</Typography>  
  
  
                    </Box>
                    <Box sx={{
                        display: "flex", 
                        justifyContent: "center", 
                        alignItems: "center", 
                        margin:"6%",
                    }}>
                        <AccessAlarmOutlinedIcon></AccessAlarmOutlinedIcon>
                        <Typography sx={{
                            fontWeight: "700", 
                            paddingLeft:"5px",
                            fontSize:"12px",
                            textAlign:"center",
                            color: "common.black",
                        }}>
                            {dateTime}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{
                    ...cardButton, 
                    backgroundColor: darkMode ?"text.primary" :"text.secondary"
                    }}>
                    <Typography sx={{
                        color:darkMode ?"background.paper":"background.default", 
                        fontWeight:"700",
                        fontSize:"8px", 
                        textAlign:"center"
                    }}>
                        CLIQUE APÓS TOMAR O MEDICAMENTO</Typography>
                </Box>
            </Card>
        )}
         {isModalEditVisible?<ModalEditMedicine 
         isOpen={isModalEditVisible} onClose={()=>{setIsModalEditVisible(false)}}>
         </ModalEditMedicine>:null}

        {isModalDeleteVisible?<ModalDelete 
        isOpen={isModalDeleteVisible} 
        onClose={()=>{setIsModalDeleteVisible(false)}}>
        </ModalDelete>:null}

        {isEvents && (
            <Card sx={{
                height: 175,
                margin: "auto",
                display: "flex",
                flexDirection: "column",
                backgroundColor: darkMode?"text.secondary":"background.paper",
                width: { xs: "100%", sm: "95%", md: "90%", lg: "90%" },
            }}>
                <Box sx={{
                    backgroundColor: darkMode ? "primary.dark" : "primary.light",
                    padding: "12px",
                }}>
                    <Typography sx={{
                        fontSize: 12,
                        color:darkMode ?"text.primary" : "background.default",
                        fontWeight: "bold",
                        textAlign: "center",
                        wordBreak: "break-word",  

                    }}>
                        {title}
                    </Typography>
                </Box>
                <Box sx={{
                     width: "100%",
                     height: "100%",
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                }}>
                    <Box sx={{
                         height: "70%",
                         display: "flex",
                         alignItems: "center",
                         flexDirection: "column",
                    }}>
                        <Typography sx={{
                            fontSize: 12,
                            width: "auto",
                            color: "#62636C",
                            maxWidth: "150px",
                            textAlign: "center",
                        }}>
                            {description}
                        </Typography>
                        <Typography sx={{
                             m: 1,
                             fontSize: 15,
                             fontWeight: "bold",
                             textAlign: "center",
                             color: "common.black",
                        }}>
                            {dateTime}
                        </Typography>
                    </Box>
                </Box>
            </Card>
        )}
        </Grid>
    );
}
export default CardUniversal;