import { SignUpContext } from "@/modules/auth/types";

export interface CollaboratorUpdateContext extends SignUpContext {}
export interface CollaboratorRemoveContext {
  id: string;
}
