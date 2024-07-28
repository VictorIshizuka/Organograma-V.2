import { v4 as uuid } from "uuid";

import { collaborators } from "@/modules/collaborator/data";
import {
  CreateSessionService,
  CreateSessionServiceResult,
  ForgotPasswordService,
  ResetPasswordService,
  SignUpService,
} from "./types";

let attemptForgotPassword = 0;
let attemptResetPassword = 0;

export const createSessionService = (
  params: CreateSessionService
): CreateSessionServiceResult => {
  const foundCollaborator = collaborators.find(
    collaborator =>
      collaborator.email === params.email &&
      collaborator.password === params.password
  );

  if (!foundCollaborator) {
    throw new Error("E-mail e/ou Senha inválido ");
  }
  return { collaborator: foundCollaborator };
};

export const forgotPasswordService = (params: ForgotPasswordService) => {
  const foundCollaborator = collaborators.find(
    collaborator => collaborator.email === params.email
  );
  attemptForgotPassword++;
  if (!foundCollaborator) {
    if (attemptForgotPassword < 3) throw new Error("E-mail inválido");

    if (attemptForgotPassword === 3)
      throw new Error("Limite de 3 tentativas atingido.");
  }
  return 123456;
};

export const resetPasswordService = (params: ResetPasswordService) => {
  const foundCollaborator = collaborators.find(
    collaborator => collaborator.email === params.email
  );
  attemptResetPassword++;
  if (!foundCollaborator && params.code !== 123456) {
    if (attemptResetPassword < 5) throw new Error("Código inválido");

    if (attemptResetPassword === 5)
      throw new Error("Limite de 5 tentativas atingido");
  }
  return;
};
export const signUpService = (params: SignUpService) => {
  const foundCollaborator = collaborators.find(
    collaborator => collaborator.email === params.email
  );
  if (foundCollaborator) {
    throw new Error("Este email ja possui um cadastro");
  }
  collaborators.push({
    _id: uuid(),
    ...params,
    createdAt: new Date().toISOString(),
    updatedAt: null,
  });
};
