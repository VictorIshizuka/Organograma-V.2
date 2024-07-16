import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { BaseLayout } from "../Layout";
import { useNavigate } from "react-router-dom";

export function ForgotPasswordPage() {
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
    <BaseLayout title="Esqueceu sua senha">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container>
          <TextField
            margin="normal"
            required
            label="E-mail"
            name="email"
            autoComplete="email"
            autoFocus
            fullWidth
          />
          <Grid container justifyContent="end">
            <Grid item>
              <Link
                href="#"
                variant="body2"
                sx={{
                  fontSize: "13px",
                  textDecoration: "none",
                }}
                onClick={() => {
                  navigate("/");
                }}
              >
                Possui uma senha?
              </Link>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              navigate("/reset-password");
            }}
          >
            Enviar
          </Button>
        </Grid>
      </Box>
    </BaseLayout>
  );
}
