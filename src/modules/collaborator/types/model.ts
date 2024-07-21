export interface CollaboratorModel {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
  team: string;
  password: string;
}

export interface TeamModel {
  id: string;
  name: string;
  color: string;
}

export interface CollaboratorsWithoutPasswordModel
  extends Omit<CollaboratorModel, "password"> {
  password?: string;
}
