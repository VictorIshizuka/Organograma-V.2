export interface CreateSessionContext {
  email: string;
  password: string;
}

export interface ForgotPasswordContext {
  email: string;
}

export interface ResetPasswordContext {
  code: string;
  email: string;
  password: string;
}
