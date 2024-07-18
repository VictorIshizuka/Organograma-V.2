import { Route, Routes } from "react-router-dom";
import { LoginPage } from "@/modules/auth/pages/Login";
import { ForgotPasswordPage } from "@/modules/auth/pages/ForgotPassword";
import { ResetPasswordPage } from "@/modules/auth/pages/ResetPassword";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
    </Routes>
  );
};
