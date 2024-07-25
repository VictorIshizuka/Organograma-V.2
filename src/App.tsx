import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "@/modules/auth/hook";
import { CollaboratorProvider } from "@/modules/collaborator/hook";

import { SnackbarProvider } from "@/common/styles/snackbar";
import { ThemeProvider } from "@/common/styles/contextTheme";
import { Routes } from "@/common/routes";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <SnackbarProvider>
          <AuthProvider>
            <CollaboratorProvider>
              <Routes />
            </CollaboratorProvider>
          </AuthProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
