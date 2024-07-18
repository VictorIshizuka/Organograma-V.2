import { Navigate, Route, Routes } from "react-router-dom";
import { AppBarComponent } from "@/common/components/AppBar";
import { ListCollaboratorsPage } from "@/modules/collaborator/pages/list";

export const SignedRoutes = (): JSX.Element => {
  return (
    <>
      <AppBarComponent />
      <Routes>
        <Route path="/" element={<ListCollaboratorsPage />} />
        <Route path="/*" element={<Navigate replace to="/not-found" />} />
      </Routes>
    </>
  );
};
