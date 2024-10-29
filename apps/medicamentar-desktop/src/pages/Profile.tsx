import {Box, Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel} from "@mui/material";
import SideBar from "../components/SideBar.tsx";
import Header from "../components/Header.tsx";
import { useTheme } from "../constants/theme/useTheme";
import Profile_Default from "../assets/icons/Profile_Default.jpg";
import Change_Photo from "../assets/icons/Change_Photo.svg";

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
    "& .MuiInputBase-root": { height: "50px" },
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: darkMode ? "primary.main" : "common.white",
      }}
    >
      <Header />
      <SideBar />
      <Box
        sx={{
          width: "100%",
          margin: { xs: "2%", md: "3%" },
          marginTop: { xs: "4%", md: "5%" },
          marginLeft: { xs: "3%", md: "5%" },
          paddingTop: "84px",
          maxHeight: "calc(100vh - 84px)",
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              color: darkMode ? "common.white" : "primary.main",
              marginRight: { sm: "15px" },
              fontSize: { xs: "2rem", md: "2rem" },
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            PERFIL
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              marginTop: "45px",
              width: "100%",
            }}
          >
            <Box
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                marginBottom: { xs: "20px", sm: 0 },
                marginRight: { sm: "60px" },
              }}
            >
              <img
                src={Profile_Default}
                alt="Perfil"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <Button
                onClick={() => console.log('Trocar foto')}
                disableRipple
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  "&:hover": {
                    opacity: 0.8,
                    background: "transparent",
                  },
                  "&:active": {
                    transform: "translate(-50%, -50%) scale(0.7)",
                  },
                  transition: "transform 0.2s ease",
                }}
              >
                <img src={Change_Photo} alt="Alterar foto" style={{ width: "40px", height: "40px" }} />
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  width: "100%",
                }}
              >
                <TextField
                  label="NOME"
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                    style: { fontSize: "0.9rem", color: darkMode ? "text.primary" : "#B9BBC6" },
                  }}
                  InputProps={{
                    sx: { fontSize: "14px", borderColor: darkMode ? "text.primary" : "#B9BBC6" },
                  }}
                  sx={{
                    width: { xs: "100%", sm: "210px" },
                    marginRight: { sm: "20px", xs: 0 },
                    marginBottom: { xs: "15px", sm: 0 },
                    ...textFieldStyles,
                  }}
                />
                <TextField
                  label="IDADE"
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                    style: { fontSize: "0.8rem", color: darkMode ? "text.primary" : "#B9BBC6" },
                  }}
                  InputProps={{
                    sx: { fontSize: "14px", borderColor: darkMode ? "text.primary" : "#B9BBC6" },
                  }}
                  sx={{
                    width: { xs: "100%", sm: "70px" },
                    marginRight: { sm: "20px", xs: 0 },
                    marginBottom: { xs: "15px", sm: 0 },
                    ...textFieldStyles,
                  }}
                />
                <TextField
                  label="PESO"
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                    style: { fontSize: "0.8rem", color: darkMode ? "text.primary" : "#B9BBC6" },
                  }}
                  InputProps={{
                    sx: { fontSize: "14px", borderColor: darkMode ? "text.primary" : "#B9BBC6" },
                  }}
                  sx={{
                    width: { xs: "100%", sm: "85px" },
                    marginRight: { sm: "20px", xs: 0 },
                    marginBottom: { xs: "15px", sm: 0 },
                    ...textFieldStyles,
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { sm: "column", md: "row" },
                  width: "100%",
                  marginTop: "10px",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                <TextField
                  label="ENDEREÇO"
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                    style: { fontSize: "0.9rem", color: darkMode ? "text.primary" : "#B9BBC6" },
                  }}
                  InputProps={{
                    sx: { fontSize: "14px", borderColor: darkMode ? "text.primary" : "#B9BBC6" },
                  }}
                  sx={{
                    width: { xs: "100%", sm: "210px" },
                    marginRight: { sm: "20px", xs: 0 },
                    marginBottom: { xs: "15px", sm: 0 },
                    ...textFieldStyles,
                  }}
                />

                <FormControl
                  variant="outlined"
                  sx={{
                    width: { xs: "100%", sm: "85px" },
                    marginRight: { sm: "5px", xs: 0 },
                    marginBottom: { xs: "15px", sm: 0 },
                  }}
                >
                  <InputLabel
                    id="sangue-label"
                    sx={{
                      fontSize: "0.8rem",
                      color: darkMode ? "text.primary" : "#B9BBC6",
                      "&.Mui-focused": { color: darkMode ? "text.primary" : "#B9BBC6" },
                      marginTop: "18px",
                    }}
                    shrink={true}
                  >
                    SANGUE
                  </InputLabel>
                  <Select
                    labelId="sangue-label"
                    id="sangue-select"
                    label="SANGUE"
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
                      marginTop: "15px",
                      height: "50px",
                      width: { xs: "100%", sm: "70px" },
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

                <TextField
                  label="ALTURA"
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                    style: { fontSize: "0.8rem", color: darkMode ? "text.primary" : "#B9BBC6" },
                  }}
                  InputProps={{
                    sx: { fontSize: "14px", borderColor: darkMode ? "text.primary" : "#B9BBC6" },
                  }}
                  sx={{
                    width: { xs: "100%", sm: "85px" },
                    ...textFieldStyles,
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Button
            variant="contained"
            sx={{
              backgroundColor: darkMode ? "primary.light" : "primary.light",
              padding: "22px",
              boxShadow: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "40px",
              marginLeft: { xs: "0", sm: "200px", md: "505px" },
              width: { xs: "100%", sm: "120px" },
              height: "50px",
              overflow: "hidden",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "13px",
                wordBreak: "break-word",
                overflow: "hidden",
              }}
            >
              SALVAR
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;