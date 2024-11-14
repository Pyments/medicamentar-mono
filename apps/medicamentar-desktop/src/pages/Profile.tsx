import {
  Box,
  Grid,
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  Typography,
  FormControl,
} from "@mui/material";
import SideBar from "../components/SideBar.tsx";
import Header from "../components/Header.tsx";
import { useTheme } from "../constants/theme/useTheme";
import Profile_Default from "../assets/icons/Profile_Default.jpg";
import Change_Photo from "../assets/icons/Change_Photo.svg";

import { ContainerUniversal } from "@components/ContainerUniversal.tsx";
import { SectionContainer } from "@components/SectionContainer.tsx";

const Profile = () => {
  const { darkMode } = useTheme();

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
    },
  };

  return (
    <ContainerUniversal>
      <Header />
      <SideBar />
      <SectionContainer>
        <Typography
          sx={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "20px",
            marginRight: { sm: "15px" },
            textAlign: { xs: "center", md: "left" },
            color: darkMode ? "common.white" : "primary.main",
          }}
        >
          PERFIL
        </Typography>
        <Box
          sx={{
            width: "150px",
            height: "150px",
            display: "flex",
            position: "relative",
            justifyContent: "center",
            transition: "transform margin 200ms ease",
            margin: { xs: "0 auto", md: "0 0 0 10px" },
          }}
        >
          <Box
            component="img"
            src={Profile_Default}
            alt="Perfil"
            sx={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "50%",
              position: "relative",
            }}
          ></Box>
          <Button
            onClick={() => console.log("Trocar foto")}
            disableRipple
            sx={{
              top: "50%",
              left: "50%",
              cursor: "pointer",
              position: "absolute",
              background: "transparent",
              transform: "translate(-50%, -50%)",
              transition: "transform 0.2s ease",
              "&:hover": {
                opacity: 0.8,
                background: "transparent",
              },
              "&:active": {
                transform: "translate(-50%, -50%) scale(0.7)",
              },
            }}
          >
            <Box
              component="img"
              src={Change_Photo}
              alt="Alterar foto"
              sx={{
                top: "50%",
                left: "50%",
                position: "absolute",
                transform: "translate(-50%, -50%)",
              }}
            />
          </Button>
        </Box>
        <Grid container spacing={3} sx={{ maxWidth: "720px", mt: "10px" }}>
          <Grid item md={8} sm={8} xs={12}>
            <TextField
              label="NOME"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
                style: {
                  fontSize: "0.9rem",
                  color: darkMode ? "text.primary" : "#B9BBC6",
                },
              }}
              InputProps={{
                sx: {
                  fontSize: "14px",
                  borderColor: darkMode ? "text.primary" : "#B9BBC6",
                },
              }}
              sx={{
                width: 1,
                marginRight: { sm: "20px", xs: 0 },
                marginBottom: { xs: "15px", sm: 0 },
                ...textFieldStyles,
              }}
            />
          </Grid>
          <Grid item md={2} sm={4} xs={6}>
            <TextField
              label="IDADE"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
                style: {
                  fontSize: "0.8rem",
                  color: darkMode ? "text.primary" : "#B9BBC6",
                },
              }}
              InputProps={{
                sx: {
                  fontSize: "14px",
                  borderColor: darkMode ? "text.primary" : "#B9BBC6",
                },
              }}
              sx={{
                ...textFieldStyles,
              }}
            />
          </Grid>
          <Grid item md={2} sm={4} xs={6}>
            <TextField
              label="PESO"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
                style: {
                  fontSize: "0.8rem",
                  color: darkMode ? "text.primary" : "#B9BBC6",
                },
              }}
              InputProps={{
                sx: {
                  fontSize: "14px",
                  borderColor: darkMode ? "text.primary" : "#B9BBC6",
                },
              }}
              sx={{
                ...textFieldStyles,
              }}
            />
          </Grid>

          <Grid item md={4} sm={8} xs={12}>
            <TextField
              label="ENDEREÇO"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
                style: {
                  fontSize: "0.9rem",
                  color: darkMode ? "text.primary" : "#B9BBC6",
                },
              }}
              InputProps={{
                sx: {
                  fontSize: "14px",
                  borderColor: darkMode ? "text.primary" : "#B9BBC6",
                },
              }}
              sx={{
                ...textFieldStyles,
              }}
            />
          </Grid>

          <Grid item md={4} sm={4} xs={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel
                id="sangue-label"
                sx={{
                  fontSize: "0.8rem",
                  color: darkMode ? "text.primary" : "#B9BBC6",
                  "&.Mui-focused": {
                    color: darkMode ? "text.primary" : "#B9BBC6",
                  },
                }}
                shrink={true}
              >
                SANGUE
              </InputLabel>
              <Select
                labelId="sangue-label"
                id="sangue-select"
                label="SANGUE"
                fullWidth
                sx={{
                  fontSize: "14px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderTop: "none",
                    borderColor: darkMode ? "text.primary" : "#B9BBC6",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: darkMode ? "text.primary" : "#B9BBC6",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: darkMode ? "text.primary" : "#B9BBC6",
                  },
                }}
              >
                <MenuItem value="A+">A+</MenuItem>
                <MenuItem value="A-">A-</MenuItem>
                <MenuItem value="B+">B+</MenuItem>
                <MenuItem value="B-">B-</MenuItem>
                <MenuItem value="AB+">AB+</MenuItem>
                <MenuItem value="AB-">AB-</MenuItem>
                <MenuItem value="O+">O+</MenuItem>
                <MenuItem value="O-">O-</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={4} sm={8} xs={6}>
            <TextField
              label="ALTURA"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
                style: {
                  fontSize: "0.8rem",
                  color: darkMode ? "text.primary" : "#B9BBC6",
                },
              }}
              InputProps={{
                sx: {
                  fontSize: "14px",
                  borderColor: darkMode ? "text.primary" : "#B9BBC6",
                },
              }}
              sx={{
                w: 1,
                ...textFieldStyles,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{
                width: "120px",
                height: "50px",
                margin: "0 auto",
                padding: "22px",
                display: "flex",
                boxShadow: "none",
                overflow: "hidden",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: darkMode ? "primary.light" : "primary.light",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1rem",
                  overflow: "hidden",
                  fontWeight: "bold",
                  wordBreak: "break-word",
                }}
              >
                SALVAR
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </SectionContainer>
    </ContainerUniversal>
  );
};

export default Profile;
