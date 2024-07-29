import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useAuth } from "@/modules/auth/hook";

import { ImageComponent } from "@/common/components/Image";

import { teams } from "@/modules/collaborator/data";

import { ProfileForm } from "@/modules/collaborator/types";

import { Box, Button, Grid, Paper } from "@mui/material";

import { FormTextField } from "@/common/components/Form/TextField";
import { FormSelect } from "@/common/components/Form/Selector";

export const Profile = (): JSX.Element => {
  const { control, handleSubmit, watch, reset } = useForm<ProfileForm>();
  const imageProfile = watch("image");
  const { isLoggedUser } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedUser) {
      reset({
        ...isLoggedUser,
        name: isLoggedUser.name,
        email: isLoggedUser.email,
        role: isLoggedUser.role,
        team: isLoggedUser.team,
        image: isLoggedUser.image,
      });
    }
  }, [isLoggedUser, reset]);

  const onSubmit = (params: ProfileForm) => {
    if (params.password === params.confirmPassword) {
      console.log("ok");
    } else {
      alert("senhas devem ser iguais");
    }
  };

  return (
    <Box height="100vh" bgcolor="#f3eeee">
      <Box
        padding={4}
        bgcolor={"#f3eeee"}
        display="flex"
        justifyContent="center"
      >
        <Paper
          sx={{
            padding: 3,
            width: "600px",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
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
                  name="password"
                  label="Senha"
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
                  inputProps={{
                    type: "password",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 2 }}
                >
                  Salvar
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 2, mb: 2 }}
                  onClick={() => navigate(-1)}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
