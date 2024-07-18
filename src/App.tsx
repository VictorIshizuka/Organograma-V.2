import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "@/modules/auth/hook";

import { SnackbarProvider } from "@/common/styles/snackbar";
import { ThemeProvider } from "@/common/styles/contextTheme";
import { Routes } from "@/common/routes";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <SnackbarProvider>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
