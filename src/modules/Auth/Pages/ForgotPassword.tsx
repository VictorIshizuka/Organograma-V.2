import { useCallback, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useAuth } from "@/modules/auth/hook";

import { BaseLayout } from "@/modules/auth/layout";

import { ForgotPasswordForm } from "@/modules/auth/types/form";

import { FormTextField } from "@/common/components/Form/TextField";
import { FormConfirmButton } from "@/common/components/Form/ConfirmButton";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export function ForgotPasswordPage() {
  const { control, handleSubmit } = useForm<ForgotPasswordForm>();

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
