import { CollaboratorModel } from "@/modules/collaborator/types";

export interface CreateSessionHook {
  email: string;
  password: string;
}

export interface ForgotPasswordHook {
  email: string;
}

export interface ResetPasswordHook {
  code: string;
  email: string;
  password: string;
}

export interface SignUpHook extends CollaboratorModel {}
