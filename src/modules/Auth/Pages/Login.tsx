import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "@/modules/auth/hook";

import { CreateSessionHook } from "@/modules/auth/types";

import { loginValidations } from "@/modules/auth/validations";

import { BaseLayout } from "@/modules/auth/layout";
import { FormTextField, FormConfirmButton } from "@/common/components/Form";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

export function LoginPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSessionHook>({
    resolver: yupResolver(loginValidations),
  });

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
              error={errors?.email?.message}
              required
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormTextField
              control={control}
              name="password"
              label="Senha"
              error={errors?.password?.message}
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
