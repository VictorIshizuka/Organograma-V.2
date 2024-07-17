export interface CollaboratorModel {
  id: number;
  uuid: string;
  name: string;
  email: string;
  image?: string | null;
  role: string;
  team: string[];
  password: string;
}
