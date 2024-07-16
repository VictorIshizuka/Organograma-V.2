import { LoginPage } from "@/modules/Auth/Pages/Login";
import { Navigate, Route, Routes } from "react-router-dom";

export const NotSignedRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />;
      <Route path="/*" element={<Navigate replace to="/not-found" />} />
    </Routes>
  );
};
