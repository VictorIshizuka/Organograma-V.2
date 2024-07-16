import { ListCollaboratorsPage } from "@/modules/Collaborators/Pages/List";
import { Navigate, Route, Routes } from "react-router-dom";

export const SignedRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<ListCollaboratorsPage />} />
      <Route path="/*" element={<Navigate replace to="/not-found" />} />
    </Routes>
  );
};
