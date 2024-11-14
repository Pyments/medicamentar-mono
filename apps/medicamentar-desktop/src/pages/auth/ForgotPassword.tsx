import { Box, Button, Paper, Typography } from "@mui/material";
import Header from "../../components/Header";
import WhiteTextField from "../../components/WhiteTextField";
import { useTheme } from "../../constants/theme/useTheme";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ContainerUniversal } from "@components/ContainerUniversal";

export default function ForgotPassword() {
  const [error, setError] = React.useState<null | string>(null);
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (email === "") {
      setError("Preencha todos os campos");
      return false;
    }
    if (!emailRegex.test(email)) {
      setError("Insira um email válido");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = (data.get("email") as string) ?? "";

    if (validateEmail(email)) {
      await forgot(email);
    }
  };

  const { darkMode } = useTheme();

  const card__wrapper = {
    display: "flex",
    alignItems: "center",
    p: "0 30px 30px 30px ",
    flexDirection: "column",
    backgroundColor: darkMode ? "primary.dark" : "primary.light",
  };

  const card__button = {
    my: 1.5,
    py: 1.5,
    backgroundColor: darkMode ? "primary.light" : "primary.main",
  };

  const card__cancel_button = {
    py: 1.5,
    backgroundColor: darkMode ? "#EFF0F3" : "#EFF0F3",
    color: "primary.main",
    fontWeight: 500,
    "&:hover": {
      backgroundColor: "primary.dark",
      color: "common.white",
    },
  };

  const forgot = async (email: string) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/auth/forgot?email=${email}`
      );

      setError(null);
      navigate("/reset-password");
      return response;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || "Ocorreu um erro na recuperação"
        );
      } else {
        setError("Ocorreu um erro inesperado");
      }
    }
  };

  const handleCancel = () => {
    window.location.href = "/signin";
  };

  return (
    <ContainerUniversal
      sx={{
        backgroundColor: darkMode ? "primary.darker" : "common.white",
        overflowY: "auto",
      }}
    >
      <Header />
      <Paper sx={card__wrapper}>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            my: "50px",
            fontSize: "30px",
            fontWeight: "bold",
            color: "common.white",
          }}
        >
          {"RECUPERAR SENHA"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Typography
            component="p"
            variant="body1"
            sx={{
              color: "common.white",
            }}
          >
            {
              "Insira seu e-mail e um link será enviado para redefinir sua senha"
            }
          </Typography>
          <WhiteTextField
            required
            fullWidth
            id="email"
            name="email"
            label="Email"
            margin="normal"
            autoComplete="email"
          />
          {error && (
            <Typography sx={{ color: "common.white", textAlign: "center" }}>
              {error}
            </Typography>
          )}
          <Button fullWidth type="submit" variant="contained" sx={card__button}>
            {"ENVIAR"}
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={card__cancel_button}
            onClick={handleCancel}
          >
            {"CANCELAR"}
          </Button>
        </Box>
      </Paper>
    </ContainerUniversal>
  );
}
