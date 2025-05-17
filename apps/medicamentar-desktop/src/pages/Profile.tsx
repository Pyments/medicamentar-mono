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
import Header from "@components/Header.tsx";
import SideBar from "@components/SideBar.tsx";
import Change_Photo from "@assets/icons/Change_Photo.svg";
import Profile_Default from "@assets/icons/Profile_Default.jpg";
import { SectionContainer } from "@components/SectionContainer.tsx";
import { ContainerUniversal } from "@components/ContainerUniversal.tsx";
import { useEffect, useState, useRef } from "react";
import axiosInstance from "@utils/axiosInstance";
import { useTheme } from "@constants/theme/useTheme";
import { useLocalStorage } from "@hooks/UseLocalStorage";
import { PageTitle } from "@components/PageTitle";

interface UserData {
  name: string;
  email: string; 
  age: number;
  weigth: string | number;
  bloodType: string;
  address: string;
  height: number;
  profileImage: string | File;
}

interface User {
  token: {
    data: string;
  };
}

const Profile = () => {
  const { darkMode, largeFont } = useTheme();
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    age: 0,
    weigth: "",
    bloodType: "",
    address: "",
    height: 0,
    profileImage: "",
  });
  const [user] = useLocalStorage<User | null>("user", null);
  const token = user?.token.data;
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get(`/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data.data;
        setUserData({
          name: data.name || "",
          email: data.email || "",
          age: data.age || 0,
          weigth: data.weigth || 0,
          bloodType: data.bloodType || "",
          address: data.address || "",
          height: data.height || 0,
          profileImage: data.profileImage || "",
        });
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    }
    };

    fetchProfile();
  }, []);

  const handleChange = (field: string, value: string | number) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setImageFile(file);
      setUserData(prev => ({ ...prev, profileImage: file }));
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("age", userData.age.toString());
      formData.append("weigth", String(parseInt(userData.weigth as string) || 0));
      formData.append("bloodType", userData.bloodType);
      formData.append("address", userData.address);
      formData.append("height", userData.height.toString());
      if (imageFile instanceof File) {
        formData.append("profileImage", imageFile);
      }
  
      const response = await axiosInstance.put(`/user`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("PUT response:", response.data);
    } catch (error: any) {
      if (error.response?.status === 429) {
      } else if (error.response) {
        console.error("Erro PUT:", error.response.data);
      } else {
        console.error("Erro de rede:", error);
      }
    }
  };

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
      fontSize: largeFont ? "1.4rem" : "14px",
    },
    "& .MuiInputBase-input": {
      fontSize: largeFont ? "1.4rem" : "14px",
      padding: largeFont ? "16px 14px" : "10px 14px",
    },
    "& .MuiInputLabel-root": {
      fontSize: largeFont ? "1.2rem" : "0.9rem",
      color: darkMode ? "text.primary" : "#B9BBC6",
      "&.Mui-focused": {
        color: darkMode ? "text.primary" : "#B9BBC6",
      },
    },
  };

  return (
    <ContainerUniversal>
      <Header />
      <SideBar />
      <SectionContainer>
        <PageTitle>PERFIL</PageTitle>
        <Box
          sx={{
            width: "150px",
            height: "150px",
            display: "flex",
            position: "relative",
            justifyContent: "center",
            transition: "transform margin 200ms ease",
            margin: { xs: "0 auto", md: "0 0 0 10px" },
            "&:hover .change-photo-btn": {
            opacity: 1,
            },
          }}
        >
          <Box
            component="img"
            src={
              imagePreviewUrl
                ? imagePreviewUrl
                : typeof userData.profileImage === "string" && userData.profileImage !== ""
                ? userData.profileImage
                : Profile_Default
            }          
            alt="Perfil"
            sx={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          ></Box>
          <Button
            onClick={() => fileInputRef.current?.click()}
            disableRipple
            className="change-photo-btn"
            sx={{
              top: "50%",
              left: "50%",
              opacity: 0,
              cursor: "pointer",
              position: "absolute",
              background: "transparent",
              transform: "translate(-50%, -50%)",
              transition: "opacity 0.3s ease, transform 0.2s ease",
              "&:hover": {
                opacity: 1,
                background: "transparent",
              },
              "&:active": {
                transform: "translate(-50%, -50%) scale(0.9)",
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
              <input
              type="file"
              hidden
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </Button>
        </Box>
        <Grid container spacing={3} sx={{ maxWidth: "720px", mt: "10px" }}>
          <Grid item md={8} sm={8} xs={12}>
            <TextField
              label="NOME"
              value={userData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
                style: {
                  fontSize: largeFont ? "1.2rem" : "0.9rem",
                  color: darkMode ? "text.primary" : "#B9BBC6",
                },
              }}
              InputProps={{
                sx: {
                  fontSize: largeFont ? "1.4rem" : "14px",
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
              value={userData.age}
              onChange={(e) => {
                const value = e.target.value;
                const parsed = parseInt(value, 10);
              
                if (value === "") {
                  handleChange("age", 0);
                } else if (!isNaN(parsed) && parsed >= 0 && parsed <= 110) {
                  handleChange("age", parsed);
                }
              }}                   
              fullWidth
              InputLabelProps={{
                shrink: true,
                style: {
                  fontSize: largeFont ? "1.2rem" : "0.8rem",
                  color: darkMode ? "text.primary" : "#B9BBC6",
                },
              }}
              InputProps={{
                sx: {
                  fontSize: largeFont ? "1.4rem" : "14px",
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
              value={userData.weigth || "0"}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,3}$/.test(value)) {
                    handleChange("weigth", value);
                }
              }}                     
              fullWidth
              InputLabelProps={{
                shrink: true,
                style: {
                  fontSize: largeFont ? "1.2rem" : "0.8rem",
                  color: darkMode ? "text.primary" : "#B9BBC6",
                },
              }}
              InputProps={{
                sx: {
                  fontSize: largeFont ? "1.4rem" : "14px",
                  borderColor: darkMode ? "text.primary" : "#B9BBC6",
                },
                endAdornment: <Typography sx={{ fontSize: largeFont ? "1.4rem" : "14px", color: "text.secondary", ml: 1 }}>KG</Typography>,
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
              value={userData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              fullWidth
              InputLabelProps={{
                shrink: true,
                style: {
                  fontSize: largeFont ? "1.2rem" : "0.9rem",
                  color: darkMode ? "text.primary" : "#B9BBC6",
                },
              }}
              InputProps={{
                sx: {
                  fontSize: largeFont ? "1.4rem" : "14px",
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
                  fontSize: largeFont ? "1.2rem" : "0.8rem",
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
                value={userData.bloodType}
                onChange={(e) => handleChange("bloodType", e.target.value)}
                fullWidth
                sx={{
                  fontSize: largeFont ? "1.4rem" : "14px",
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
                  "& .MuiSelect-select": {
                    padding: largeFont ? "16px 14px" : "10px 14px",
                  },
                }}
              >
                <MenuItem value="A+" sx={{ fontSize: largeFont ? "1.4rem" : "14px" }}>A+</MenuItem>
                <MenuItem value="A-" sx={{ fontSize: largeFont ? "1.4rem" : "14px" }}>A-</MenuItem>
                <MenuItem value="B+" sx={{ fontSize: largeFont ? "1.4rem" : "14px" }}>B+</MenuItem>
                <MenuItem value="B-" sx={{ fontSize: largeFont ? "1.4rem" : "14px" }}>B-</MenuItem>
                <MenuItem value="AB+" sx={{ fontSize: largeFont ? "1.4rem" : "14px" }}>AB+</MenuItem>
                <MenuItem value="AB-" sx={{ fontSize: largeFont ? "1.4rem" : "14px" }}>AB-</MenuItem>
                <MenuItem value="O+" sx={{ fontSize: largeFont ? "1.4rem" : "14px" }}>O+</MenuItem>
                <MenuItem value="O-" sx={{ fontSize: largeFont ? "1.4rem" : "14px" }}>O-</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={4} sm={8} xs={6}>
            <TextField
              label="ALTURA"
              value={userData.height}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,3}$/.test(value)) {
                  if (value === "") {
                    handleChange("height", 0);
                  } else {
                    handleChange("height", parseInt(value));
                  }
                }
              }}                          
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
                style: {
                  fontSize: largeFont ? "1.2rem" : "0.8rem",
                  color: darkMode ? "text.primary" : "#B9BBC6",
                },
              }}
              InputProps={{
                sx: {
                  fontSize: largeFont ? "1.4rem" : "14px",
                  borderColor: darkMode ? "text.primary" : "#B9BBC6",
                },
                endAdornment: <Typography sx={{ fontSize: largeFont ? "1.4rem" : "14px", color: "text.secondary", ml: 1 }}>CM</Typography>,
              }}
              sx={{
                w: 1,
                ...textFieldStyles,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                width: largeFont ? "150px" : "120px",
                height: largeFont ? "60px" : "50px",
                margin: "0 auto",
                padding: largeFont ? "28px" : "22px",
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
                  fontSize: largeFont ? "1.2rem" : "1rem",
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