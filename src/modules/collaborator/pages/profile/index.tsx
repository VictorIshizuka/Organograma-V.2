import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "@/modules/auth/hook";

import { ImageComponent } from "@/common/components/Image";
import { teams } from "@/modules/collaborator/data";

import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";

export const Profile = (): JSX.Element => {
  const { isLoggedUser } = useAuth();

  const [imageBase64, setImageBase64] = useState<string | undefined>("");
  const navigate = useNavigate();
  const [team, setTeam] = useState("");
  const [user, setUser] = useState<{
    name?: string;
    role?: string;
    team?: string;
    email?: string;
    password?: string;
  }>();
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (isLoggedUser) {
      setUser({ ...isLoggedUser });
      setTeam(isLoggedUser.team);
      setImageBase64(isLoggedUser.image);
    }
  }, [isLoggedUser]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user?.password === confirmPassword) {
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
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                  image={imageBase64}
                  sx={{ width: 80, height: 80 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  value={user?.name}
                  label="Nome"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUser({ ...user, name: e.target.value });
                  }}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  value={user?.email}
                  label="E-mail"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUser({ ...user, email: e.target.value });
                  }}
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Time *</InputLabel>
                  <Select
                    value={team}
                    onChange={e => {
                      return setTeam(e.target.value as unknown as string);
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {teams.map((item, index) => {
                      return (
                        <MenuItem value={item.name} key={index}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  value={user?.role}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                  fullWidth
                  name="role"
                  label="Cargo"
                  type="text"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                  fullWidth
                  name="password"
                  label="Confirmar senha"
                  type="password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setConfirmPassword(e.target.value);
                  }}
                  fullWidth
                  name="password"
                  label="Confirmar senha"
                  type="password"
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
