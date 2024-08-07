import CssBaseline from "@mui/material/CssBaseline";
import ProjectStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "../contextTheme";

export function GlobalStyles({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <ThemeProvider>
      <CssBaseline />
      <ProjectStyles styles={{ "#root": { height: "100vh" } }} />
      {children}
    </ThemeProvider>
  );
}
