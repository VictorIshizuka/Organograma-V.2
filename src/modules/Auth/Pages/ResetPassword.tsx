import { useCallback, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

import { useAuth } from "@/modules/auth/hook";

import { ResetPasswordForm } from "@/modules/auth/types/form";

import { BaseLayout } from "@/modules/auth/layout";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { FormTextField } from "@/common/components/Form/TextField";
import { FormConfirmButton } from "@/common/components/Form/ConfirmButton";

export function ResetPasswordPage() {
  const { control, handleSubmit } = useForm<ResetPasswordForm>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, resetPassword } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const [disabled, setDisabled] = useState(false);

  let attempt = 0;
  const attemptEmail = useCallback(() => {
    attempt++;
    if (attempt === 5) setDisabled(true);
  }, [attempt]);

  const onSubmit = (params: ResetPasswordForm) => {
    if (params.password === params.confirmPassword) {
      void resetPassword({ ...params, email: location.state });

      attemptEmail();
      return;
    }
    enqueueSnackbar("Senhas devem ser iguais", { variant: "warning" });
  };

  return (
    <BaseLayout title="Definir nova senha">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        <Grid container>
          <Grid item xs={12} sm={12}>
            <FormTextField
              control={control}
              name="code"
              label="Código"
              required
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormTextField
              control={control}
              name="password"
              label="Nova senha"
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
