import { SignUpHook } from "@/modules/auth/types";

export interface CollaboratorUpdateHook extends SignUpHook {}
export interface CollaboratorRemoveHook {
  _id: string;
}
