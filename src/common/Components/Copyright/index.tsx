import { GridProps, Typography, Link } from "@mui/material";

export function Copyright(props: GridProps) {
  return (
    <Typography variant="body2" color="#aeacac" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="#">
        My-project
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
