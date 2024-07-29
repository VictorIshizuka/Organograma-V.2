import { Route, Routes } from "react-router-dom";
import { LoginPage } from "@/modules/auth/pages/Login";
import { ForgotPasswordPage } from "@/modules/auth/pages/ForgotPassword";
import { ResetPasswordPage } from "@/modules/auth/pages/ResetPassword";
import { SignUpPage } from "@/modules/auth/pages/SignUp";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
};
