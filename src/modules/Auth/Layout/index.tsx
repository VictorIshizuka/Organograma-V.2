import { Copyright } from "@/common/components/Copyright";
import { Box, Paper, Typography } from "@mui/material";
import logo from "@/common/assets/logo.svg";

export const BaseLayout = ({
  title,
  children,
  wide,
}: {
  title: string;
  wide?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      bgcolor="#395ca3"
      justifyContent="center"
    >
      <Paper
        sx={{
          padding: "5px 20px",
          width: wide ? 650 : 350,
        }}
      >
        <Box
          marginY={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <img src={logo} width={40} alt="" />
          <Typography
            component="h1"
            variant="h5"
            fontWeight="bold"
            marginTop="10px"
          >
            {title}
          </Typography>
          {children}
        </Box>
      </Paper>
      <Copyright sx={{ position: "absolute", bottom: "5px" }} />
    </Box>
  );
};
