import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/modules/auth/hook";

import { BaseLayout } from "@/modules/auth/layout";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Avatar,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from "@mui/material";

const Input = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  border: "none",
  paddingBottom: "19px",
  overflow: "hidden",
  whiteSpace: "nowrap",
});

export function SignUpPage() {
  const navigate = useNavigate();
  const { isLoading } = useAuth();

  const [imageBase64, setImageBase64] = useState<string>("");
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
    <BaseLayout title="Cadastre-se">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
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
              margin="dense"
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
            <FormControl margin="dense" fullWidth>
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
              margin="dense"
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

          <Grid item xs={12} sm={6}>
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
          </Grid>

          <Grid item xs={12} sm={6}>
            <Avatar
              src={imageBase64}
              sizes="small"
              sx={{ margin: "2px ", width: 50, height: 50 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
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
              margin="dense"
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
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {isLoading ? <CircularProgress size={25} /> : "Registrar"}
        </Button>
      </Box>
      <Grid container justifyContent="center">
        <Grid item>
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
      </Grid>
    </BaseLayout>
  );
}