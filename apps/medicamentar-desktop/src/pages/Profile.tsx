import {
  Box,
  Grid,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import Header from "@components/Header.tsx";
import SideBar from "@components/SideBar.tsx";
import Change_Photo from "@assets/icons/Change_Photo.svg";
import Profile_Default from "@assets/icons/Profile_Default.jpg";
import { SectionContainer } from "@components/SectionContainer.tsx";
import { ContainerUniversal } from "@components/ContainerUniversal.tsx";
import { useTheme } from "@constants/theme/useTheme";
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import ThemedTextField from "@components/ThemedTextField";

const Profile = () => {
  const { darkMode, largeFont } = useTheme();

  const [sangue, setSangue] = useState<string>("");

  const labelFontSize = largeFont ? "1.2rem" : "1rem";
  const inputFontSize = largeFont ? "1.1rem" : "0.95rem";

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: darkMode ? "text.primary" : "#B9BBC6",
      },
      "&.Mui-focused fieldset": {
        borderColor: darkMode ? "text.primary" : "#B9BBC6",
      },
      "&:hover fieldset": {
        borderColor: darkMode ? "text.primary" : "#B9BBC6",
      },
      "& .MuiInputBase-input": {
        fontSize: inputFontSize,
        padding: "16.5px 14px",
      },
    },
    "& .MuiInputLabel-root": {
      fontSize: labelFontSize,
      color: darkMode ? "text.primary" : "#B9BBC6",
      "&.Mui-focused": {
        color: darkMode ? "text.primary" : "#B9BBC6",
      },
    },
  };

  const tiposSanguineos = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleSangueChange = (event: SelectChangeEvent<string>) => {
    setSangue(event.target.value);
  };

  return (
    <ContainerUniversal>
      <Header />
      <SideBar />
      <SectionContainer>
        <Typography
          sx={{
            fontSize: largeFont ? "2.2rem" : "2rem",
            fontWeight: "bold",
            mb: 3,
            textAlign: { xs: "center", md: "left" },
            color: darkMode ? "common.white" : "primary.main",
          }}
        >
          PERFIL
        </Typography>

        <Box
          sx={{
            width: { xs: 120, sm: 150 },
            height: { xs: 120, sm: 150 },
            mb: 4,
          }}
        >
          <Box
            component="img"
            src={Profile_Default}
            alt="Foto de perfil"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
              border: `2px solid ${darkMode ? "#fff" : "#eee"}`,
              display: "block",
            }}
          />
          <Button
            component="label"
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              minWidth: 40,
              height: 40,
              borderRadius: "50%",
              p: 0,
              bgcolor: darkMode ? "primary.dark" : "primary.main",
              "&:hover": {
                bgcolor: darkMode ? "primary.darker" : "primary.dark",
              },
            }}
          >
            <Box
              component="img"
              src={Change_Photo}
              alt="Alterar foto"
              sx={{
                width: 24,
                height: 24,
                filter: darkMode ? "invert(1)" : "none",
              }}
            />
          </Button>
        </Box>

        <Grid container spacing={3} sx={{ maxWidth: 800 }}>
          <Grid item xs={12} md={8}>
            <ThemedTextField
              label="NOME COMPLETO"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={6} md={2}>
            <ThemedTextField
              label="IDADE"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={6} md={2}>
            <ThemedTextField
              label="PESO (kg)"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ThemedTextField
              label="ENDEREÇO"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel
                shrink
                sx={{
                  fontSize: labelFontSize,
                  color: darkMode ? "text.primary" : "#B9BBC6",
                }}
              >
                SANGUE
              </InputLabel>
              <Select
                label="SANGUE"
                value={sangue}
                onChange={handleSangueChange}
                input={<OutlinedInput notched label="SANGUE" />}
                sx={{
                  ...textFieldStyles,
                  "& .MuiSelect-select": {
                    fontSize: inputFontSize,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: darkMode ? "text.primary" : "#B9BBC6",
                  },
                }}
              >
                {tiposSanguineos.map((tipo) => (
                  <MenuItem key={tipo} value={tipo}>
                    {tipo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <ThemedTextField
              label="ALTURA (cm)"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                width: { xs: "100%", sm: 200 },
                py: 1.5,
                fontSize: largeFont ? "1.1rem" : "1rem",
                fontWeight: "bold",
              }}
            >
              SALVAR
            </Button>
          </Grid>
        </Grid>
      </SectionContainer>
    </ContainerUniversal>
  );
};

export default Profile;
