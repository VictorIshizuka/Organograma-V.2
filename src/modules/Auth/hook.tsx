import { createContext, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import {
  CreateSessionContext,
  ResetPasswordContext,
  SignUpContext,
} from "@/modules/auth/types";
import { CollaboratorsWithoutPasswordModel } from "@/modules/collaborator/types/model";
import { collaborators } from "../collaborator/data";

interface AuthProps {
  isLoading: boolean;
  isSigned: boolean;
  isLoggedUser?: CollaboratorsWithoutPasswordModel;
}

const INITIAL_STATE: AuthProps = {
  isLoading: false,
  isSigned: false,
  isLoggedUser: undefined,
};

type AuthContextProps = AuthProps & {
  createSession: (params: CreateSessionContext) => void;
  signUp: (params: SignUpContext) => void;
  forgotPassword: (params: string) => void;
  resetPassword: (params: ResetPasswordContext) => void;
  signOut: () => void;
  setStateSafety: (
    newData:
      | Partial<AuthProps>
      | ((newData: AuthProps) => Partial<AuthContextProps>)
  ) => void;
};

const AuthContext = createContext(INITIAL_STATE as AuthContextProps);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  let attempts = 0;
  const code = "1234";

  const [state, setState] = useState(() => {
    const isSigned = INITIAL_STATE.isLoggedUser;
    if (isSigned !== undefined) return { ...INITIAL_STATE, isSigned: true };
    return { ...INITIAL_STATE, isSigned: false };
  });

  const setStateSafety = useCallback(
    (
      newData:
        | Partial<AuthProps>
        | ((newData: AuthProps) => Partial<AuthContextProps>)
    ) => {
      setState(oldData => ({ ...oldData, ...newData }));
    },
    [setState]
  );

  const createSession = useCallback(
    async (params: CreateSessionContext) => {
      setStateSafety({ isLoading: true });
      try {
        const foundUser = collaborators.find(
          collaborator =>
            collaborator.email === params.email &&
            collaborator.password === params.password
        );
        if (foundUser) {
          return setStateSafety({
            isSigned: true,
            isLoggedUser: foundUser,
            isLoading: false,
          });
        }
        throw new Error("E-mail e/ou senha inválida");
      } catch (error) {
        setStateSafety({
          isSigned: false,
          isLoading: false,
        });
        enqueueSnackbar("E-mail e/ou senha inválida", {
          variant: "warning",
        });
      }
    },
    [enqueueSnackbar, setStateSafety]
  );

  const forgotPassword = useCallback(
    (params: string) => {
      attempts++;
      setStateSafety({ isLoading: true });
      try {
        const foundUser = collaborators.find(
          collaborator => collaborator.email === params
        );

        if (foundUser) {
          enqueueSnackbar("E-mail enviado com sucesso!!", {
            variant: "success",
          });
          setTimeout(() => {
            enqueueSnackbar("Código: 1234", { variant: "success" });
          }, 2000);
          navigate("/reset-password", { state: params });
          setStateSafety({ isLoading: false });

          return;
        }
        attempts < 3 &&
          enqueueSnackbar("E-email inválido", {
            variant: "warning",
          });

        if (attempts === 3) throw new Error("Limite de 3 tentativas atingido");
      } catch (error) {
        setStateSafety({ isLoading: false });
        enqueueSnackbar("Limite de 3 tentativas atingido", {
          variant: "warning",
        });
      }
    },
    [setStateSafety, attempts, enqueueSnackbar, navigate]
  );
  const resetPassword = useCallback(
    (params: ResetPasswordContext) => {
      attempts++;
      setStateSafety({ isLoading: true });
      try {
        if (params.code === code) {
          setTimeout(() => {
            enqueueSnackbar("Senha alterada com sucesso!!", {
              variant: "success",
            });
            navigate("/");
            setStateSafety({ isSigned: true, isLoading: false });
          }, 2000);
          return;
        }
        if (attempts < 5) {
          enqueueSnackbar("Código inválido", {
            variant: "warning",
          });
          return setStateSafety({ isLoading: false });
        }
        if (attempts === 5) throw new Error("Limite de 5 tentativas atingido");
      } catch (error) {
        setStateSafety({ isLoading: false });
        enqueueSnackbar("Limite de 5 tentativas atingido", {
          variant: "warning",
        });
      }
    },
    [setStateSafety, enqueueSnackbar, attempts, navigate]
  );

  const signOut = useCallback(() => {
    navigate("/");
    setStateSafety({
      isLoggedUser: undefined,
      isSigned: false,
      isLoading: false,
    });
  }, [navigate, setStateSafety]);

  const signUp = useCallback(
    (params: SignUpContext) => {
      setStateSafety({ isLoading: true });

      try {
        collaborators.push(params);
        setStateSafety({ isLoading: false, isSigned: true });
        navigate("/");
      } catch (error) {
        setStateSafety({ isLoading: false });
        console.log("erro em alguma coisa ");
      }
    },
    [navigate, setStateSafety]
  );

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signOut,
        signUp,
        createSession,
        forgotPassword,
        resetPassword,
        setStateSafety,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
