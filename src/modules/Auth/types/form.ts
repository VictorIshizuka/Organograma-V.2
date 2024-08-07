export interface CreateSessionForm {
  email: string;
  password: string;
}

export interface ForgotPasswordForm {
  email: string;
}

export interface ResetPasswordForm {
  code: string;
  password: string;
  confirmPassword: string;
}
export interface SignUpForm {
  name: string;
  email: string;
  photo?: string;
  role: string;
  team: string;
  password: string;
  confirmPassword: string;
}
