import { AuthRoutes } from "@/modules/Auth/Routes";
import { Navigate, Route, Routes } from "react-router-dom";

export const NotSignedRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/*" element={<AuthRoutes />} />;
      <Route path="/*" element={<Navigate replace to="/not-found" />} />
    </Routes>
  );
};
