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
    height: "50px",
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle
        sx={{
          backgroundColor: darkMode ? "#1E1F24" : "",
        }}
      >
        <Typography
          sx={{
            paddingX: "30px",
            fontWeight: "800",
            color: darkMode ? " secondary.text" : " primary.text",
          }}
        >
          Tem certeza que deseja sair?
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          padding: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            mx: "auto",
            mb: "20px",
            fontSize: "1rem",
            fontWeight: "500",
            color: darkMode ? " secondary.text" : " primary.text",
          }}
        >
          Você terá que logar novamente no sistema
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
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
            <Typography sx={{ color: "red" }}>SAIR</Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
export default LogoutModal;
