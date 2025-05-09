import { Box, Button } from "@mui/material";
import { useTheme } from "@constants/theme/useTheme.ts";

interface AddBtn {
  handleModal: () => void;
  text: string;
}

export const AddBtn: React.FC<AddBtn> = ({ handleModal, text }) => {
  const { darkMode } = useTheme();
  return (
    <Button
      onClick={handleModal}
      sx={{
        zIndex: 10,
        color: "white",
        borderRadius: { xs: "50%", md: "4px" },
        padding: { xs: 0, md: "14px" },
        px: { xs: 3.5, md: 2 },
        fontWeight: "bold",
        right: { xs: "30px", md: "auto" },
        bottom: { xs: "30px", md: "auto" },
        position: { xs: "fixed", md: "relative" },
        backgroundColor: darkMode ? "primary.dark" : "primary.light",
        "&:hover": {
          backgroundColor: darkMode ? "primary.light" : "primary.main",
        },
        textTransform: "uppercase",
      }}
    >
      <Box
        component="span"
        sx={{ fontSize: { xs: "3rem", md: "1rem" }, mr: { xs: 0, md: 1 } }}
      >
        +
      </Box>
      <Box component="span" sx={{ display: { xs: "none", md: "block" } }}>
        ADICIONAR {text}
      </Box>
    </Button>
  );
};
