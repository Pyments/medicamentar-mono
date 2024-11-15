import {
  Box,
  Paper,
  Button,
  Snackbar,
  Typography,
} from "@mui/material";
import Header from "../../components/Header";
import WhiteTextField from "../../components/WhiteTextField";
import { useTheme } from "../../constants/theme/useTheme";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ContainerUniversal } from "@components/ContainerUniversal";

interface SnackbarProps {
  open: boolean;
  vertical: "top" | "bottom";
  horizontal: "center" | "left" | "right";
}

export default function ResetPassword() {
  const [error, setError] = React.useState<null | string>(null);
  const [displaySnackbar, setDisplaySnackbar] = React.useState<SnackbarProps>({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = displaySnackbar;
  const navigate = useNavigate();

  const handleClose = () => {
    setDisplaySnackbar({ ...displaySnackbar, open: false });
  };

  const validateEmail = (
    token: string,
    password: string,
    confirmPassword: string
  ): boolean => {
    if (token === "" || password === "") {
      setError("Preencha todos os campos");
      return false;
    }

    if (password !== confirmPassword) {
      setError("As senhas devem ser iguais");
      return false;
    }

    if (password.length < 6 || password.length > 12) {
      setError("As senhas devem ter entre 6 e 12 dígitos");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const password = (data.get("password") as string) ?? "";
    const confirmPassword = (data.get("confirmPassword") as string) ?? "";
    const token = (data.get("token") as string) ?? "";

    if (validateEmail(token, password, confirmPassword)) {
      await forgot(token, password);
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

  const forgot = async (token: string, password: string) => {
    try {
      const response = await axios.post(
        `https://medicamentar-api-latest.onrender.com/auth/reset?token=${token}&newPassword=${password}`
      );

      setError(null);
      setDisplaySnackbar({ ...displaySnackbar, open: true });
      setTimeout(() => {
        navigate("/");
      }, 6000);
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
      {displaySnackbar && (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message="Nova senha criada com sucesso"
          key={vertical + horizontal}
          autoHideDuration={5000}
        />
      )}
      <Paper sx={card__wrapper}>
        <Typography
          variant="h5"
          sx={{
            my: "50px",
            fontSize: "30px",
            fontWeight: "bold",
            color: "common.white",
          }}
        >
          {"NOVA SENHA"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <WhiteTextField
            required
            fullWidth
            id="password"
            name="password"
            label="Nova senha"
            margin="normal"
            autoComplete="password"
          />
          <WhiteTextField
            required
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirmar nova senha"
            margin="normal"
            autoComplete="password"
          />
          <WhiteTextField
            required
            fullWidth
            id="token"
            name="token"
            label="Token"
            margin="normal"
            autoComplete="token"
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
