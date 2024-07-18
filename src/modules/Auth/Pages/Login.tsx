import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/modules/auth/hook";

import { BaseLayout } from "@/modules/auth/layout";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { CircularProgress } from "@mui/material";

export function LoginPage() {
  const navigate = useNavigate();
  const { createSession, isLoading } = useAuth();

  const [user, setUser] = useState<{
    email?: string;
    password?: string;
  }>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      email: { value: string };
      password: { value: string };
    };
    if (user?.email !== undefined && user?.password !== undefined) {
      const params = {
        email: formElements.email.value,
        password: formElements.password.value,
      };
      void createSession(params);
      setUser({ email: "", password: "" });
    }
  };

  return (
    <BaseLayout title="Login">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container>
          <TextField
            required
            fullWidth
            label="E-mail"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUser({ ...user, email: e.target.value });
            }}
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="dense"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUser({ ...user, password: e.target.value });
            }}
            fullWidth
            name="password"
            label="Senha"
            type="password"
            autoComplete="current-password"
          />
          <Grid container justifyContent="end">
            <Grid item>
              <Link
                href="#"
                variant="body2"
                sx={{
                  textDecoration: "none",
                }}
                onClick={() => {
                  navigate("forgot-password");
                }}
              >
                Esqueceu sua senha?
              </Link>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? <CircularProgress size={25} /> : "Entrar"}
          </Button>
        </Grid>
      </Box>
      <Grid container justifyContent="center">
        <Grid item>
          <Link
            href="#"
            variant="body2"
            sx={{
              textDecoration: "none",
            }}
          >
            {"Não tem uma conta? Cadastre-se."}
          </Link>
        </Grid>
      </Grid>
    </BaseLayout>
  );
}
