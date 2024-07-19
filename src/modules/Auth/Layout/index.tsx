import { Copyright } from "@/common/components/Copyright";
import { Box, Paper, Typography } from "@mui/material";

export const BaseLayout = ({
  title,
  children,
  wide = false,
}: {
  title: string;
  wide?: boolean;
  children: React.ReactNode;
}) => {
  const logo = "../../../../public/chart-tree_5169456.svg";
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#395ca3",
        justifyContent: "center",
        // backgroundImage: "url(../assets/bgInitialImage.jpg)",
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
        // backgroundPosition: "center",
      }}
    >
      <Paper
        sx={{
          padding: "5px 20px",
          width: wide ? 350 : 620,
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
