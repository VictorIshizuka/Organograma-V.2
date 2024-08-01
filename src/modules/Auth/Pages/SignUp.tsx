import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "@/modules/auth/hook";

import { signUpValidations } from "@/modules/auth/validations";

import { teams } from "@/modules/collaborator/data";

import { SignUpForm } from "@/modules/auth/types/form";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

import {
  FormTextField,
  FormSelect,
  FormConfirmButton,
} from "@/common/components/Form";
import { BaseLayout } from "@/modules/auth/layout";
import { ImageComponent } from "@/common/components/Image";

export function SignUpPage() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpForm>({ resolver: yupResolver(signUpValidations) });
  const navigate = useNavigate();
  const { isLoading, signUp } = useAuth();

  const imageUrl = watch("photo");

  const onSubmit = (params: SignUpForm) => {
    void signUp(params);
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
              error={errors?.name?.message}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormTextField
              control={control}
              name="email"
              label="E-mail"
              error={errors?.email?.message}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormSelect
              control={control}
              name="team"
              label="Time"
              error={errors?.team?.message}
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
              error={errors?.role?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormTextField
              control={control}
              name="photo"
              label="Foto"
              required
              error={errors?.photo?.message}
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
              error={errors?.password?.message}
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
              error={errors?.confirmPassword?.message}
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
