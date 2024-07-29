import { useAuth } from "@/modules/Auth/hook";

export const ListCollaboratorsPage = (): JSX.Element => {
  const { logout } = useAuth();
  return (
    <>
      <h1>logado</h1>
      <button onClick={() => logout()}>sair</button>
    </>
  );
};
