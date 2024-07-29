import {
  CreateSessionService,
  ForgotPasswordService,
  ResetPasswordService,
  SignUpService,
} from "./service";

export interface CreateSessionHook extends CreateSessionService {}

export interface ForgotPasswordHook extends ForgotPasswordService {}

export interface ResetPasswordHook extends ResetPasswordService {}

export interface SignUpHook extends SignUpService {}
