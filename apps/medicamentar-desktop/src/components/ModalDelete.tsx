import { Box, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

interface ModalDeleteProps{
    isOpen:boolean;
    onClose:()=>void;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({isOpen, onClose})=>{
    const styleContentBox={ 
        cursor:"pointer",
        width:"100%", 
        height:"30px",
        display:"flex",
        alignItems:"center", 
        justifyContent:"center",
        marginTop:"6px" 
    }
    return(
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>
                <Typography sx={{fontWeight:"500", color:"#62636C", paddingLeft:"30px",paddingRight:"30px"}}>
                    DELETAR MEDICAMENTO
                </Typography>
            </DialogTitle>
            <DialogContent sx = {{display:"flex", justifyContent:"space-between", padding:0}}>
                <Box sx ={{...styleContentBox, backgroundColor:"primary.light"}}onClick={onClose}>
                    <Typography sx={{color:"#FFF"}}>CANCELAR</Typography>
                </Box>
                <Box sx ={{...styleContentBox, backgroundColor:"grey.200"}}>
                    <Typography sx={{color:"red"}}>DELETAR</Typography>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
export default ModalDelete;