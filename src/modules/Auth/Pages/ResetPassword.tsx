import { useCallback, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "@/modules/auth/hook";

import { ResetPasswordForm } from "@/modules/auth/types/form";

import { resetPasswordValidations } from "@/modules/auth/validations";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";

import { BaseLayout } from "@/modules/auth/layout";
import { FormTextField, FormConfirmButton } from "@/common/components/Form";

export function ResetPasswordPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: yupResolver(resetPasswordValidations),
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, resetPassword } = useAuth();

  const [disabled, setDisabled] = useState(false);

  let attempt = 0;
  const attemptEmail = useCallback(() => {
    attempt++;
    if (attempt === 5) setDisabled(true);
  }, [attempt]);

  const onSubmit = (params: ResetPasswordForm) => {
    void resetPassword({
      ...params,
      code: Number(params.code),
      email: location.state!,
    });

    attemptEmail();
  };

  return (
    <BaseLayout title="Definir nova senha">
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
              name="code"
              label="Código"
              required
              error={errors?.code?.message}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormTextField
              control={control}
              name="password"
              label="Nova senha"
              error={errors?.password?.message}
              required
              inputProps={{
                type: "password",
                autoComplete: "password",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormTextField
              control={control}
              name="confirmPassword"
              label="Confirmar nova senha"
              error={errors?.confirmPassword?.message}
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
            sm={12}
            sx={{ display: "flex", justifyContent: "end" }}
          >
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
          <FormConfirmButton disabled={disabled} loading={isLoading}>
            Salvar
          </FormConfirmButton>
        </Grid>
      </Box>
    </BaseLayout>
  );
}
