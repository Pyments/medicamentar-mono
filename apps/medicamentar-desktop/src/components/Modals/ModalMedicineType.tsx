import {
  Box,
  Stack,
  Modal,
  Button,
  MenuItem,
  IconButton,
  Typography,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useState } from "react";
import { useTheme } from "@theme/useTheme";
import { Select, SelectChangeEvent } from "@mui/material";
import ModalXCloseButton from "@assets/icons/ModalXCloseButton.svg";

interface ModalMedicineTypeProps {
  isOpen: boolean;
  setOpen: () => void;
  setType: (type: number) => void;
  onClose: () => void;
}

export default function ModalMedicineType({
  isOpen,
  onClose,
  setOpen,
  setType,
}: ModalMedicineTypeProps) {
  const [tipoMedicamento, setTipoMedicamento] = useState<number>(-1);
  const { darkMode } = useTheme();

  enum Type {
    ORAL = 0,
    TOPICO = 1,
    OFTALMICO = 2,
    INTRANASAL = 3,
    INJETAVEL = 4,
    SUBLINGUAL = 5,
    TRANSDERMICO = 6,
    RETAL = 7,
    VAGINAL = 8,
  }

  return (
    <Modal open={isOpen} onClose={() => onClose()}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "500px",
          height: "324px",
          display: "flex",
          borderRadius: "5px",
          alignSelf: "center",
          alignItems: "center",
          padding: "15px 31px",
          alignContent: "center",
          backgroundColor: darkMode ? "grey.900" : "common.white",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Stack
          direction="column"
          sx={{
            width: "100%",
            margin: "0 auto",
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <IconButton sx={{ alignSelf: "end" }} onClick={() => onClose()}>
            <img src={ModalXCloseButton} />
          </IconButton>
          <Typography
            sx={{
              fontSize: "1.4rem",
              fontWeight: 600,
              color: darkMode ? "primary.light" : "primary.main",
            }}
          >
            NOVO MEDICAMENTO
          </Typography>
          <Stack direction="column" sx={{ py: 5 }}>
            <FormControl fullWidth>
              <InputLabel>TIPO DE MEDICAMENTO</InputLabel>
              <Select
                sx={{ width: "240px" }}
                label="TIPO DE MEDICAMENTO"
                type="number"
                value={String(tipoMedicamento)}
                onChange={(event: SelectChangeEvent) =>
                  setTipoMedicamento(Number(event.target.value))
                }
              >
                <MenuItem value={Type.ORAL}>ORAL</MenuItem>
                <MenuItem value={Type.TOPICO}>TÓPICO</MenuItem>
                <MenuItem value={Type.OFTALMICO}>OFTÁLMICO</MenuItem>
                <MenuItem value={Type.INTRANASAL}>INTRANASAL</MenuItem>
                <MenuItem value={Type.INJETAVEL}>INJETÁVEL</MenuItem>
                <MenuItem value={Type.SUBLINGUAL}>SUBLINGUAL</MenuItem>
                <MenuItem value={Type.TRANSDERMICO}>TRANSDÉRMICO</MenuItem>
                <MenuItem value={Type.RETAL}>RETAL</MenuItem>
                <MenuItem value={Type.VAGINAL}>VAGINAL</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              disabled={tipoMedicamento < 0}
              onClick={() => {
                setType(Number(tipoMedicamento));
                onClose();
                setOpen();
              }}
              sx={{
                my: 2,
                h: "50px",
                w: "240px",
                borderRadius: "5px",
                backgroundColor: darkMode ? "primary.light" : "primary.main",
              }}
            >
              <Typography
                sx={{ fontSize: "1.2rem", fontWeight: 600, py: "8px" }}
              >
                PROSSEGUIR
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
