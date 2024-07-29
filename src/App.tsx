import { ThemeProvider } from "./common/styles/ContextTheme";
import { Routes } from "./common/Routes";
import { AuthProvider } from "./modules/Auth/hook";
import { SnackbarProvider } from "./common/styles/snackbar";
import { BrowserRouter } from "react-router-dom";

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
