import { CollaboratorModel } from "@/modules/collaborator/types";
import {
  CreateSessionService,
  ForgotPasswordService,
  ResetPasswordService,
} from "./service";

export interface CreateSessionHook extends CreateSessionService {}

export interface ForgotPasswordHook extends ForgotPasswordService {}

export interface ResetPasswordHook extends ResetPasswordService {}

export interface SignUpHook extends CollaboratorModel {}
