import { createContext, useCallback, useContext, useState } from "react";

import { useSnackbar } from "notistack";

import { collaborators } from "@/modules/collaborator/data";

import {
  CollaboratorRemoveHook,
  CollaboratorUpdateHook,
  CollaboratorModel,
} from "@/modules/collaborator/types";

interface CollaboratorProps {
  isLoading: boolean;
  registers?: CollaboratorModel[];
}

const INITIAL_STATE: CollaboratorProps = {
  isLoading: false,
  registers: collaborators,
};

type UserContextProps = CollaboratorProps & {
  collaboratorList: () => void;
  collaboratorUpdate: (params: CollaboratorUpdateHook) => void;
  collaboratorRemove: (params: CollaboratorRemoveHook) => void;
};

const CollaboratorContext = createContext(INITIAL_STATE as UserContextProps);
export const CollaboratorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const [state, setState] = useState<CollaboratorProps>(INITIAL_STATE);

  const setStateSafety = useCallback(
    (
      newData:
        | Partial<CollaboratorProps>
        | ((newData: CollaboratorProps) => Partial<UserContextProps>)
    ) => {
      setState(oldData => ({ ...oldData, ...newData }));
    },
    [setState]
  );

  const collaboratorUpdate = useCallback(
    async (params: CollaboratorUpdateHook) => {
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
    async (params: CollaboratorRemoveHook) => {
      setStateSafety({ isLoading: true });

      try {
        const foundUser = collaborators.find(item => item._id === params._id);

        if (foundUser) {
          const list = collaborators.filter(item => item._id !== foundUser._id);

          setStateSafety({
            isLoading: false,
            registers: list,
          });
        } else {
          console.log("User not found");
          setStateSafety({ isLoading: false });
        }
      } catch (error) {
        console.error("Error:", error);
        setStateSafety({
          isLoading: false,
        });
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
