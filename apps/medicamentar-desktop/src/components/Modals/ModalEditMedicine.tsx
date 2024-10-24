import {Dialog} from "@mui/material";


interface ModalEditMedicineProps{
    isOpen:boolean;
    onClose:()=>void;
}

const ModalEditMedicine: React.FC<ModalEditMedicineProps>= ({isOpen, onClose})=>{

    return(
        <Dialog open={isOpen} onClose={onClose}>
            
        </Dialog>
    );

} 
export default ModalEditMedicine;   