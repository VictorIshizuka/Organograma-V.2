import {
  Avatar,
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Profile = (): JSX.Element => {
  const [imageBase64, setImageBase64] = useState<string>("");
  const navigate = useNavigate();
  const [team, setTeam] = useState("");
  const [user, setUser] = useState<{
    name?: string;
    role?: string;
    team?: string;
    email?: string;
    password?: string;
  }>();

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
  handleImageUpload;
  const listTeam = ["Programação", "Frontend"];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user?.email !== undefined && user?.password !== undefined) {
      const params = {
        ...user,
        image: imageBase64,
      };
      console.log(params);
      // void createSession(params);
      setUser({ email: "", password: "" });
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
              <Grid item xs={12} sm={12} display="flex" justifyContent="center">
                <Avatar
                  src="../../../auth/assets/bgInitialImage.jpg"
                  sx={{ width: 80, height: 80 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
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
                    {listTeam.map((item, index) => {
                      return (
                        <MenuItem value={item} key={index}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                  fullWidth
                  name="role"
                  label="Cargo"
                  type="text"
                />
              </Grid>

              {/* <Grid item xs={12} sm={6}>
              <Button
              component="label"
              fullWidth
              variant="contained"
              startIcon={<CloudUploadIcon />}
              >
              Foto
              <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              />
              </Button>
              </Grid> */}

              {/* <Grid item xs={12} sm={6}>
              <Avatar
                src={imageBase64}
                sizes="small"
                sx={{ margin: "2px ", width: 50, height: 50 }}
                />
                </Grid> */}
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
                    setUser({ ...user, password: e.target.value });
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
