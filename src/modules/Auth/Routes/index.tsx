import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../Pages/Login";
import { ForgotPasswordPage } from "../Pages/ForgotPassword";
import { ResetPasswordPage } from "../Pages/ResetPassword";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
    </Routes>
  );
};
