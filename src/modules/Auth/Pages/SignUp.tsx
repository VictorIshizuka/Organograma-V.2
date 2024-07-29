import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useAuth } from "@/modules/auth/hook";

import { BaseLayout } from "@/modules/auth/layout";

import { SignUpForm } from "../types/form";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

import { teams } from "@/modules/collaborator/data";
import { FormTextField } from "@/common/components/Form/TextField";
import { FormConfirmButton } from "@/common/components/Form/ConfirmButton";
import { FormSelect } from "@/common/components/Form/Selector";
import { useRef } from "react";
import { ImageComponent } from "@/common/components/Image";

export function SignUpPage() {
  const { control, handleSubmit, watch } = useForm<SignUpForm>();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoading, signUp } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);

  const imageUrl = watch("image");

  const onSubmit = (params: SignUpForm) => {
    if (params.password === params.confirmPassword) {
      console.log(params);
      void signUp(params);
      return;
    }
    enqueueSnackbar("Senhas devem ser iguais", { variant: "warning" });
  };

  return (
    <BaseLayout title="Cadastre-se" wide>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <FormTextField
              control={control}
              name="name"
              label="Nome"
              required
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormTextField
              control={control}
              name="email"
              label="E-mail"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormSelect
              control={control}
              name="team"
              label="Time"
              required
              options={teams.map(item => item.name)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormTextField
              control={control}
              name="role"
              label="Cargo"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormTextField
              control={control}
              name="image"
              stepInput={inputRef}
              label="Foto"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ImageComponent
              image={`https://github.com/${imageUrl}.png`}
              sizes="small"
              sx={{ margin: "2px ", width: 50, height: 50 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
            <FormTextField
              control={control}
              name="confirmPassword"
              label="Confirmar senha"
              required
              inputProps={{
                type: "password",
                autoComplete: "password",
              }}
            />
          </Grid>
        </Grid>
        <FormConfirmButton loading={isLoading}>Registrar</FormConfirmButton>
      </Box>
      <Grid justifyContent="center">
        <Link
          href="#"
          variant="body2"
          onClick={() => navigate("/")}
          sx={{
            textDecoration: "none",
          }}
        >
          {"Possui cadastro?"}
        </Link>
      </Grid>
    </BaseLayout>
  );
}
