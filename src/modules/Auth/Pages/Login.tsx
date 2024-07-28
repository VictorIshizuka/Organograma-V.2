import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useAuth } from "@/modules/auth/hook";

import { CreateSessionHook } from "@/modules/auth/types";
import { FormConfirmButton } from "@/common/components/Form/ConfirmButton";

import { FormTextField } from "@/common/components/Form/TextField";
import { BaseLayout } from "@/modules/auth/layout";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

export function LoginPage() {
  const { control, handleSubmit } = useForm<CreateSessionHook>({});

  const navigate = useNavigate();
  const { createSession, isLoading } = useAuth();

  const onSubmit = (params: CreateSessionHook) => {
    void createSession(params);
  };

  return (
    <BaseLayout title="Login">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <FormTextField
              control={control}
              name="email"
              label="E-mail"
              required
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormTextField
              control={control}
              name="password"
              label="Senha"
              required
              inputProps={{
                type: "password",
                autoComplete: "password",
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            sx={{ display: "flex", justifyContent: "end" }}
          >
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
          <FormConfirmButton loading={isLoading}>Entrar</FormConfirmButton>
        </Grid>
      </Box>
      <Grid justifyContent="center">
        <Link
          href="#"
          variant="body2"
          onClick={() => navigate("/signup")}
          sx={{
            textDecoration: "none",
          }}
        >
          {"Não tem uma conta? Cadastre-se."}
        </Link>
      </Grid>
    </BaseLayout>
  );
}
