import { useTheme } from "@constants/theme/useTheme";
import { Box, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

interface CompleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete: () => void;
    isMedication: boolean;
}

const CompleteModal: React.FC<CompleteModalProps> = ({ isOpen, onClose, onComplete, isMedication }) => {
    const { darkMode } = useTheme();
    
    const styleContentBox = { 
        cursor: "pointer",
        width: "100%", 
        height: "30px",
        display: "flex",
        alignItems: "center", 
        justifyContent: "center",
    }
    
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle sx={{ backgroundColor: darkMode ? "#1E1F24" : "" }}>
                <Typography sx={{ fontWeight: "500", color: darkMode ? " secondary.text" : " primary.text", paddingLeft: "30px", paddingRight: "30px" }}>
                    {isMedication ? "CONFIRMAR MEDICAMENTO" : "CONFIRMAR CONCLUSÃO"}
                </Typography>
            </DialogTitle>
            <DialogContent sx={{ display: "flex", justifyContent: "space-between", padding: 0 }}>
                <Box sx={{ ...styleContentBox, backgroundColor: "primary.light" }} onClick={onClose}>
                    <Typography sx={{ color: "#FFF" }}>CANCELAR</Typography>
                </Box>
                <Box sx={{ ...styleContentBox, backgroundColor: "grey.200" }} onClick={onComplete}>
                    <Typography sx={{ color: "green" }}>CONFIRMAR</Typography>
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default CompleteModal;
