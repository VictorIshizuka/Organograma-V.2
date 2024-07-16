import { Copyright } from "@/common/Components/Copyright";
import { Box, Container, Paper, Typography } from "@mui/material";

export const BaseLayout = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const logo = "../../../../public/chart-tree_5169456.svg";
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#395ca3",
        // backgroundImage: "url(../assets/bgInitialImage.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container component="main" maxWidth="xs">
        <Box>
          <Paper
            sx={{
              padding: "10px",
              position: "relative",
              top: "100px",
              width: "100%",
              display: "flex",
            }}
          >
            <Container>
              <Box
                sx={{
                  marginTop: 2,
                  marginBottom: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
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
            </Container>
          </Paper>
        </Box>
      </Container>
      <Copyright sx={{ position: "absolute", bottom: "5px" }} />
    </Box>
  );
};
