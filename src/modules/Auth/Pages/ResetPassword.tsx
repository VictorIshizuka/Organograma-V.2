import { useCallback, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import { useAuth } from "../hook";

import { BaseLayout } from "../Layout";

import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, resetPassword } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [disabled, setDisabled] = useState(false);

  let attempt = 0;
  const attemptEmail = useCallback(() => {
    attempt++;
    if (attempt >= 3) setDisabled(true);
  }, [attempt]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === passwordConfirm) {
      if (code) {
        void resetPassword({ code, password, email: location.state });
        setCode("");
        setPassword("");
        setPasswordConfirm("");
      }
      attemptEmail();
    } else {
      enqueueSnackbar("Senhas devem ser iguais", { variant: "warning" });
    }
  };

  return (
    <BaseLayout title="Definir nova senha">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container>
          <TextField
            margin="normal"
            required
            fullWidth
            value={code}
            id="code"
            label="Código"
            name="code"
            autoComplete="code"
            onChange={e => setCode(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            value={password}
            fullWidth
            name="password"
            label="Nova senha"
            onChange={e => setPassword(e.target.value)}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
            name="password"
            label="Confirmar nova senha"
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
                  navigate("/");
                }}
              >
                Voltar para página de login
              </Link>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={disabled}
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? <CircularProgress size={25} /> : "Salvar"}
          </Button>
        </Grid>
      </Box>
    </BaseLayout>
  );
}
