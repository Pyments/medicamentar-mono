import { useTheme } from "@constants/theme/useTheme";
import {
  Box,
  Dialog,
  Typography,
  DialogTitle,
  DialogContent,
} from "@mui/material";

interface ModalDeleteProps {
  isOpen: boolean;
  onExit: () => void;
  onClose: () => void;
}

const LogoutModal: React.FC<ModalDeleteProps> = ({
  onExit,
  isOpen,
  onClose,
}) => {
  const { darkMode } = useTheme();
  const styleContentBox = {
    width: "100%",
    height: "30px",
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle sx={{ backgroundColor: darkMode ? "#1E1F24" : "" }}>
        <Typography
          sx={{
            fontWeight: "500",
            paddingLeft: "30px",
            paddingRight: "30px",
            color: darkMode ? " secondary.text" : " primary.text",
          }}
        >
          Tem certeza que deseja sair?
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{ display: "flex", justifyContent: "space-between", padding: 0 }}
      >
        <Box
          sx={{ ...styleContentBox, backgroundColor: "primary.light" }}
          onClick={onClose}
        >
          <Typography sx={{ color: "#FFF" }}>CANCELAR</Typography>
        </Box>
        <Box
          onClick={onExit}
          sx={{ ...styleContentBox, backgroundColor: "grey.200" }}
        >
          <Typography sx={{ color: "red" }}>DELETAR</Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
export default LogoutModal;
