import {
  Box,
  Grid,
  Dialog,
  Checkbox,
  FormGroup,
  TextField,
  Typography,
  FormControlLabel,
  Button,
} from "@mui/material";

import { useTheme } from "../../constants/theme/useTheme";

const NewMedication = () => {
  const { darkMode } = useTheme();

  return (
    <Dialog open={true} fullWidth>
      <Box
        sx={{
          p: "30px",
          flexGrow: 1,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            p: "20px 0 50px 0",
            fontSize: "1.8rem",
            fontWeight: 600,
            textAlign: "center",
            color: darkMode ? "common.white" : "primary.main",
          }}
        >
          NOVO MEDICAMENTO
        </Typography>
        <FormGroup>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="NOME DO MEDICAMENTO"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="FREQUÊNCIA (DOSE)"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField variant="outlined" label="QUANTIDADE" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="unidade"
                label="UNIDADE"
                placeholder="ML"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel control={<Checkbox />} label="USO CONTÍNUO" />
            </Grid>
            <Grid item xs={6}>
              <TextField variant="outlined" label="DATA DE INÍCIO" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField variant="outlined" label="PERÍODO (DIAS)" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="FINAL DO TRATAMENTO"
                fullWidth
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            sx={{
              mx: "auto",
              my: "30px",
              py: "18px",
              px: "20%",
              fontWeight: 800,
              fontSize: "1.2rem",
            }}
          >
            SALVAR
          </Button>
        </FormGroup>
      </Box>
    </Dialog>
  );
};

export default NewMedication;
