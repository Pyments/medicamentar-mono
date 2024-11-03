import ModalXCloseButton from "../../assets/icons/ModalXCloseButton.svg"
import { Modal, Box, Stack, IconButton, Typography, MenuItem, Button, FormControl, InputLabel } from "@mui/material";
import { useState } from "react";
import { Select, SelectChangeEvent } from "@mui/material";

export default function MedicineTypeModal() {
  const [modal, setOpenModal] = useState(true);
  const [medicamento, setTipoMedicamento] = useState("");

  return (
    <Modal open={modal}>
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "500px",
          height: "324px",
          backgroundColor: "#fff",
          borderRadius: "5px",
          alignItems: "center",
          alignSelf: "center",
          alignContent: "center",
          padding: "15px 31px",
          transform: "translate(-50%, -50%)"
        }}
      >
        <Stack
          direction="column"
          sx={{ width: "100%", alignSelf: "center", margin: "0 auto", alignItems: "center" }}
        >
          <IconButton sx={{ alignSelf: "end"}} onClick={() => setOpenModal(false)}>
            <img src={ModalXCloseButton} />
          </IconButton>
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 600,
              color: "primary.dark",
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
              value={medicamento}
              onChange={(event: SelectChangeEvent) => setTipoMedicamento(event.target.value as string)}
              >
                <MenuItem value="ORAL">ORAL</MenuItem>
                <MenuItem value="TÓPICO">TÓPICO</MenuItem>
                <MenuItem value="OFTÁLMICO">OFTÁLMICO</MenuItem>
                <MenuItem value="INTRANASAL">INTRANASAL</MenuItem>
                <MenuItem value="INJETÁVEL">INJETÁVEL</MenuItem>
                <MenuItem value="SUBLINGUAL">SUBLINGUAL</MenuItem>
                <MenuItem value="TRANSDÉRMICO">TRANSDÉRMICO</MenuItem>
                <MenuItem value="RETAL OU VAGINAL">RETAL OU VAGINAL</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              onClick={() => setOpenModal(false)} // apenas placeholder
              sx={{
                width: "240px",
                height: "50px",
                borderRadius: "5px",
                my: 2,
              }}
            >
              <Typography sx={{ fontSize: 17, fontWeight: 600 }}>
                PROSSEGUIR
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}