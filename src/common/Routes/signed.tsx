import { Navigate, Route, Routes } from "react-router-dom";
import { AppBarComponent } from "@/common/components/AppBar";
import { ListCollaboratorsPage } from "@/modules/collaborator/pages/list";
import { Profile } from "@/modules/collaborator/pages/profile";

export const SignedRoutes = (): JSX.Element => {
  return (
    <>
      <AppBarComponent>
        <Routes>
          <Route path="/*" element={<ListCollaboratorsPage />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/*" element={<Navigate replace to="/not-found" />} />
        </Routes>
      </AppBarComponent>
    </>
  );
};
