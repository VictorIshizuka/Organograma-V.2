import { useState } from "react";

import { useAuth } from "@/modules/auth/hook";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { ImageComponent } from "@/common/components/Image";

import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export function AppBarComponent({ children }: { children: React.ReactNode }) {
  const { signOut, isLoggedUser, setStateSafety, admin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mr: 2,
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                }}
              >
                OrganoDev
              </Typography>
            </Link>

            <Box flexGrow={1} display={{ xs: "flex", md: "none" }}>
              <IconButton
                size="large"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <Button onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Admin</Typography>
                </Button>
              </Menu>
            </Box>
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  display: { xs: "none", md: "none" },
                  mr: 2,
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                }}
              >
                OrganoDev
              </Typography>
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={() =>
                  admin
                    ? setStateSafety({ admin: false })
                    : setStateSafety({ admin: true })
                }
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Admin
              </Button>
            </Box>

            <Box>
              <IconButton onClick={handleOpenUserMenu}>
                <ImageComponent
                  image={`https://github.com/${isLoggedUser?.photo}.png`}
                  name={isLoggedUser?.name}
                />
              </IconButton>

              <Menu
                sx={{ mt: "45px" }}
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {location.pathname !== "/perfil" && (
                  <MenuItem onClick={() => navigate("/perfil")}>
                    <Typography textAlign="center">Perfil</Typography>
                    <AccountCircleIcon
                      fontSize="small"
                      sx={{ marginLeft: "10px" }}
                    />
                  </MenuItem>
                )}
                <MenuItem
                  onClick={() => {
                    signOut();
                  }}
                >
                  <Typography textAlign="center">Sair</Typography>
                  <LogoutIcon fontSize="small" sx={{ marginLeft: "22px" }} />
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="main">{children}</Box>
    </Box>
  );
}
