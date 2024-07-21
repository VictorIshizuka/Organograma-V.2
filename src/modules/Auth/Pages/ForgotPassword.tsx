import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/modules/auth/hook";

import { BaseLayout } from "@/modules/auth/layout";

import { CircularProgress } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export function ForgotPasswordPage() {
  const { forgotPassword, isLoading } = useAuth();
  const navigate = useNavigate();

  let attempt = 0;

  const [isEmail, setEmail] = useState("");
  const [disabled, setDisabled] = useState(false);

  const attemptEmail = useCallback(() => {
    attempt++;
    if (attempt >= 3) setDisabled(true);
  }, [attempt]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEmail !== undefined) {
      void forgotPassword(isEmail);
      setEmail("");
    }
    attemptEmail();
  };

  return (
    <BaseLayout title="Esqueceu sua senha" wide>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container>
          <TextField
            margin="normal"
            required
            label="E-mail"
            value={isEmail}
            name="email"
            onChange={e => setEmail(e.target.value)}
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
            disabled={disabled}
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? <CircularProgress size={25} /> : "Enviar"}
          </Button>
        </Grid>
      </Box>
    </BaseLayout>
  );
}
