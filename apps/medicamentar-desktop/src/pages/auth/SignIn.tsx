import * as React from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import WhiteTextField from "../../components/WhiteTextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Header from "../../components/Header";

import { useTheme } from "../../constants/theme/useTheme";

import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    navigate("/home");
  };

  const { darkMode } = useTheme();

  const page__root = {
    p: 0,
    m: 0,
    minWidth: 1,
    minHeight: 1,
    display: "flex",
    placeItems: "center",
    justifyContent: "center",
    backgroundColor: darkMode ? "primary.darker" : "common.white",
  };

  const card__wrapper = {
    display: "flex",
    alignItems: "center",
    p: "0 30px 30px 30px ",
    flexDirection: "column",
    backgroundColor: darkMode ? "primary.dark" : "primary.light",
  };

  const card__button = {
    mb: 2,
    py: 1.5,
    backgroundColor: darkMode ? "primary.light" : "primary.main",
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
          {"FAÇA LOGIN"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
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
          <FormControlLabel
            label="Lembrar senha"
            sx={{ color: "common.white" }}
            control={
              <Checkbox
                value="remember"
                color="primary"
                sx={{ color: "common.white" }}
              />
            }
          />
          <Button fullWidth type="submit" variant="contained" sx={card__button}>
            {"ENTRAR"}
          </Button>
          <Link
            to="#"
            style={{
              textAlign: "center",
              color: "common.black",
              textDecoration: "none",
            }}
          >
            <Typography color={darkMode ? "primary.lighter" : "primary.main"}>Esqueci minha senha</Typography>
          </Link>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                color: "common.white",
                display: "inline-block",
                mt: 1,
                mr: 1,
              }}
            >
              Precisando de uma conta?
            </Typography>
            <Link
              style={{
                textAlign: "center",
                color: "common.black",
                textDecoration: "none",
                display: "inline-block",
              }}
              to={"/register"}
            >
              <Typography
                sx={{ color: darkMode ? "primary.lighter" : "primary.main" }}
              >
                Registre-se
              </Typography>
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
