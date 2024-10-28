import * as React from "react";

import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import WhiteTextField from "../../components/WhiteTextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Header from "../../components/Header";

import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

import { useTheme } from "../../constants/theme/useTheme";

export default function Register() {
  const { login } = useAuth();
  const [error, setError] = React.useState<null | string>(null);
  const [remember, setRemember] = React.useState(false);
  const { darkMode } = useTheme();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const name = data.get("name");
    const email = (data.get("email") as string) ?? "";
    const password = (data.get("password") as string) ?? "";
    const confirmPassword = data.get("confirmPassword");

    const emailRegex = /\S+@\S+\.\S+/;

    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setError("Preencha todos os campos");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Insira um email válido");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas devem ser iguais");
      return;
    }

    if (
      password.length < 6 ||
      password.length > 12 ||
      confirmPassword.length < 6 ||
      confirmPassword.length > 12
    ) {
      setError("As senhas devem ter entre 6 e 12 dígitos");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });

      const token = response.data;
      if (token) {
        if (remember) {
          window.electron.store.set("email", email);
          window.electron.store.set("password", password);
        }
        setError(null);
        await login({ token });
      }
      setError(null);

      return response;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || "Ocorreu um erro no registro"
        );
      } else {
        setError("Ocorreu um erro inesperado");
      }
    }
  };

  const page__root = {
    p: 0,
    m: 0,
    minWidth: 1,
    minHeight: 1,
    alignItems: "center",
    backgroundColor: darkMode ? "primary.darker" : "common.white",
  };

  const card__wrapper = {
    m: "auto",
    transition: "ease-out 300ms margin-top",
    mt: { xs: "100px", md: "180px", lg: "220px" },
    display: "flex",
    maxWidth: "720px",
    alignItems: "center",
    p: "0 30px 30px 30px ",
    flexDirection: "column",
    backgroundColor: darkMode ? "primary.dark" : "primary.light",
  };

  return (
    <Container component="main" sx={page__root}>
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
          {"REGISTRE-SE"}
        </Typography>
        <Box component="form" width={"90%"} onSubmit={handleSubmit} noValidate>
          <WhiteTextField
            required
            fullWidth
            id="name"
            name="name"
            label="Nome completo"
            margin="normal"
            autoComplete="name"
          />
          <WhiteTextField
            required
            fullWidth
            id="email"
            name="email"
            label="Email"
            margin="normal"
            autoComplete="email"
          />
          <WhiteTextField
            required
            fullWidth
            label="Senha"
            id="password"
            type="password"
            name="password"
            margin="normal"
            variant="outlined"
            autoComplete="current-password"
          />
          <WhiteTextField
            required
            fullWidth
            label="Confirmar senha"
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            margin="normal"
            variant="outlined"
            autoComplete="current-password"
          />

          {error && (
            <Typography sx={{ color: "common.white", textAlign: "center" }}>
              {error}
            </Typography>
          )}

          <FormControlLabel
            label="Lembrar senha"
            sx={{ color: "common.white" }}
            control={
              <Checkbox
                value="remember"
                color="primary"
                sx={{ color: "common.white" }}
                onChange={(e) => setRemember(e.target.checked)}
              />
            }
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mb: 4, py: 1.5, backgroundColor: "#0078B6" }}
          >
            {"CADASTRAR-SE"}
          </Button>
          <Link
            to="/signin"
            style={{
              color: "#0078B6",
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            <Typography>Já tem uma conta?</Typography>
          </Link>
        </Box>
      </Paper>
    </Container>
  );
}
