export interface CollaboratorModel {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
  team: string;
  password: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface TeamModel {
  id: string;
  name: string;
  color: string;
}

export interface CollaboratorWithoutPasswordModel
  extends Omit<CollaboratorModel, "password"> {
  //password?: string;
}
