import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { useAuth } from "@/modules/auth/hook";

import { teams } from "@/modules/collaborator/data";

import { ProfileForm } from "@/modules/collaborator/types";

import { Box, Grid, Paper } from "@mui/material";

import {
  FormSelect,
  FormCancelButton,
  FormConfirmButton,
  FormTextField,
} from "@/common/components/Form";
import { ImageComponent } from "@/common/components/Image";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileValidations } from "../../validations";

export const Profile = (): JSX.Element => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: yupResolver(profileValidations),
  });
  const imageProfile = watch("photo");

  const { isLoggedUser, isLoading } = useAuth();

  useEffect(() => {
    if (isLoggedUser) {
      reset({
        ...isLoggedUser,
        name: isLoggedUser.name,
        email: isLoggedUser.email,
        role: isLoggedUser.role,
        team: isLoggedUser.team,
        photo: isLoggedUser.photo,
        password: "",
      });
    }
  }, [isLoggedUser, reset]);

  const onSubmit = (params: ProfileForm) => {
    console.log("ok", params);
  };

  return (
    <Box padding={4} display="flex" justifyContent="center">
      <Paper
        sx={{
          padding: 2,
          width: "600px",
        }}
      >
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              sm={12}
              marginBottom={2}
              display="flex"
              justifyContent="center"
            >
              <ImageComponent
                image={`https://github.com/${imageProfile}.png`}
                sx={{ width: 80, height: 80 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormTextField
                control={control}
                name="name"
                label="Nome"
                error={errors?.name?.message}
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
                error={errors?.email?.message}
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
                error={errors?.role?.message}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormTextField
                control={control}
                name="password"
                label="Senha"
                error={errors?.password?.message}
                required
                inputProps={{
                  type: "password",
                  //   autoComplete: "password",
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
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormConfirmButton loading={isLoading}>Salvar</FormConfirmButton>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormCancelButton>Cancelar</FormCancelButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};
