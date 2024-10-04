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
import { common } from "@mui/material/colors";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
export default function SignIn() {
  const { login } = useAuth();
  const [error, setError] = React.useState<null | string>(null);
  const [remember, setRemember] = React.useState(false);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const validateEmailAndPassword = (
    email: string,
    password: string
  ): boolean => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (email === "" || password === "") {
      setError("Preencha todos os campos");
      return false;
    }
    if (!emailRegex.test(email)) {
      setError("Insira um email válido");
      return false;
    }
    return true;
  };

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });

      const token = response.data;
      if (token) {
        if (remember) {
          window.electron.store.set("email", email);
          window.electron.store.set("password", password);
        }
        await login({ token });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Ocorreu um erro no login");
      } else {
        setError("Ocorreu um erro inesperado");
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = (data.get("email") as string) ?? "";
    const password = (data.get("password") as string) ?? "";

    if (validateEmailAndPassword(email, password)) {
      await loginUser(email, password);
    }
  };

  React.useEffect(() => {
    const fetchStoredCredentials = async () => {
      const storedEmail = (await window.electron.store.get("email")) as
        | string
        | undefined;
      const storedPassword = (await window.electron.store.get("password")) as
        | string
        | undefined;

      if (storedEmail && storedPassword) {
        setEmail(storedEmail);
        setPassword(storedPassword);
        await loginUser(storedEmail, storedPassword);
      }
    };

    fetchStoredCredentials();
  }, []);

  return (
    <Container component="main" maxWidth="sm">
      <Header />
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          p: "0 30px 30px 30px ",
          flexDirection: "column",
          backgroundColor: "primary.light",
        }}
      >
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            sx={{ mb: 2, py: 1.5 }}
          >
            {"ENTRAR"}
          </Button>
          <Link
            to="#"
            style={{
              textAlign: "center",
              color: common.black,
              textDecoration: "none",
            }}
          >
            <Typography>Esqueci minha senha</Typography>
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
                color: common.black,
                textDecoration: "none",
                display: "inline-block",
              }}
              to={"/register"}
            >
              <Typography>Registre-se</Typography>
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
