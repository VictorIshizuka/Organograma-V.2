import {
  ThemeProvider as MaterialThemeProvider,
  createTheme,
} from "@mui/material/styles";

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const PRIMARY_COLOR = "#1e5598";
  const SECONDARY_COLOR = "#FFFFFF";

  const theme = createTheme({
    palette: {
      background: { default: "#EBEFF2" },
      primary: {
        main: PRIMARY_COLOR,
      },
      secondary: {
        main: SECONDARY_COLOR,
      },
      error: { main: "#E44A35", contrastText: "#ffffff" },
      warning: { main: "#D9B834", contrastText: "#ffffff" },
      success: { main: "#369E66", contrastText: "#ffffff" },
    },
  });

  return (
    <MaterialThemeProvider theme={theme}>{children}</MaterialThemeProvider>
  );
}
