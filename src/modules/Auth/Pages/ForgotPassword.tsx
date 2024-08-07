import { useCallback, useState } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "@/modules/auth/hook";

import { ForgotPasswordForm } from "@/modules/auth/types/form";

import { forgotPasswordValidations } from "@/modules/auth/validations";

import { BaseLayout } from "@/modules/auth/layout";
import { FormTextField, FormConfirmButton } from "@/common/components/Form";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";

export function ForgotPasswordPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: yupResolver(forgotPasswordValidations),
  });

  const { forgotPassword, isLoading } = useAuth();
  const navigate = useNavigate();

  let attempt = 0;

  const [disabled, setDisabled] = useState(false);

  const attemptEmail = useCallback(() => {
    attempt++;
    if (attempt >= 3) setDisabled(true);
  }, [attempt]);

  const onSubmit = (params: ForgotPasswordForm) => {
    void forgotPassword(params);

    attemptEmail();
  };

  return (
    <BaseLayout title="Esqueceu sua senha">
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
              label="E-mail"
              name="email"
              required
              error={errors?.email?.message}
              autoFocus
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
                navigate("/");
              }}
            >
              Possui uma senha?
            </Link>
          </Grid>
          <FormConfirmButton loading={isLoading} disabled={disabled}>
            Enviar
          </FormConfirmButton>
        </Grid>
      </Box>
    </BaseLayout>
  );
}
