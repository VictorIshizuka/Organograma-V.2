import { CollaboratorsWithoutPasswordModel } from "@/modules/collaborator/types";

export interface CreateSessionService {
  email: string;
  password: string;
}

export interface CreateSessionServiceResult {
  collaborator: CollaboratorsWithoutPasswordModel;
  //token:string
}

export interface ForgotPasswordService {
  email: string;
}

export interface ResetPasswordService {
  code: number;
  email: string;
  password: string;
}

export interface SignUpService {
  name: string;
  email: string;
  image?: string;
  role: string;
  team: string;
  password: string;
}
