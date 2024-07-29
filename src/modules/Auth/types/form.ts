import {
  CreateSessionService,
  ForgotPasswordService,
  ResetPasswordService,
  SignUpService,
} from "./service";

export interface CreateSessionForm extends CreateSessionService {}

export interface ForgotPasswordForm extends ForgotPasswordService {}

export interface ResetPasswordForm extends ResetPasswordService {
  confirmPassword: string;
}
export interface SignUpForm extends SignUpService {
  confirmPassword: string;
}
