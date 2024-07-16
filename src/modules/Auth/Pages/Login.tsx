import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { BaseLayout } from "../Layout";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <BaseLayout title="Login">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
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
            Entrar
          </Button>
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
        </Grid>
      </Box>
    </BaseLayout>
  );
}
