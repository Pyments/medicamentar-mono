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

import { useTheme } from "../../constants/theme/useTheme";

export default function Register() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
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
    maxWidth: "720px",
    alignItems: "center",
    p: "25px 30px 60px 30px ",
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
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <WhiteTextField
            required
            fullWidth
            id="nome"
            name="nome"
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
            label="Confirmar senha"
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
