import { createContext, useCallback, useContext, useState } from "react";

import { useSnackbar } from "notistack";

import { CollaboratorModel } from "@/modules/collaborator/types/model";
import { collaborators } from "../collaborator/data";
import { CollaboratorUpdateContext } from "./types";

interface AuthProps {
  isLoading: boolean;
  registers?: CollaboratorModel[];
}

const INITIAL_STATE: AuthProps = {
  isLoading: false,
  registers: collaborators,
};

type UserContextProps = AuthProps & {
  collaboratorList: () => void;
  collaboratorUpdate: (params: CollaboratorUpdateContext) => void;
  collaboratorRemove: (id: string) => void;
};

const CollaboratorContext = createContext(INITIAL_STATE as UserContextProps);
export const CollaboratorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const [state, setState] = useState<AuthProps>(INITIAL_STATE);

  const setStateSafety = useCallback(
    (
      newData:
        | Partial<AuthProps>
        | ((newData: AuthProps) => Partial<UserContextProps>)
    ) => {
      setState(oldData => ({ ...oldData, ...newData }));
    },
    [setState]
  );

  const collaboratorUpdate = useCallback(
    async (params: CollaboratorUpdateContext) => {
      setStateSafety({ isLoading: true });
      try {
        const foundUser = collaborators.find(
          collaborator =>
            collaborator.email === params.email &&
            collaborator.password === params.password
        );
        if (foundUser) {
          return setStateSafety({
            isLoading: false,
          });
        }
        throw new Error("E-mail e/ou senha inválida");
      } catch (error) {
        setStateSafety({
          isLoading: false,
        });
        enqueueSnackbar("E-mail e/ou senha inválida", {
          variant: "warning",
        });
      }
    },
    [enqueueSnackbar, setStateSafety]
  );
  const collaboratorRemove = useCallback(
    async (params: string) => {
      setStateSafety({ isLoading: true });
      try {
        const foundUser = collaborators.find(
          collaborator => collaborator.id === params
        );

        if (foundUser) {
          const list = collaborators.filter(item => item.id !== foundUser.id);
          setStateSafety({
            isLoading: false,
            registers: list,
          });
        }
        //   throw new Error("E-mail e/ou senha inválida");
      } catch (error) {
        setStateSafety({
          isLoading: false,
        });
        // enqueueSnackbar("E-mail e/ou senha inválida", {
        //   variant: "warning",
        // });
      }
    },
    [setStateSafety]
  );

  const collaboratorList = useCallback(() => {
    try {
      const registers = [...collaborators];
      setStateSafety({ isLoading: false, registers });
    } catch (error) {
      setStateSafety({ isLoading: false });
    }
  }, [setStateSafety]);

  return (
    <CollaboratorContext.Provider
      value={{
        ...state,
        collaboratorUpdate,
        collaboratorRemove,
        collaboratorList,
      }}
    >
      {children}
    </CollaboratorContext.Provider>
  );
};

export const useCollaborator = () => {
  return useContext(CollaboratorContext);
};
