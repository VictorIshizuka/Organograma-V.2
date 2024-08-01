import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "@/modules/auth/hook";

import { CollaboratorProvider } from "@/modules/collaborator/hook";

import { Routes } from "@/common/routes";

import { SnackbarProvider } from "@/common/styles/snackbar";
import { GlobalStyles } from "@/common/styles/globalStyles";

function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <AuthProvider>
          <CollaboratorProvider>
            <GlobalStyles>
              <Routes />
            </GlobalStyles>
          </CollaboratorProvider>
        </AuthProvider>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
