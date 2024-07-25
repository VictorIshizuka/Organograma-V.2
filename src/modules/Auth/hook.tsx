import { createContext, useCallback, useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import {
  CreateSessionHook,
  ForgotPasswordHook,
  ResetPasswordHook,
  SignUpHook,
} from "@/modules/auth/types";

import { CollaboratorsWithoutPasswordModel } from "@/modules/collaborator/types/model";

import {
  createSessionService,
  forgotPasswordService,
  resetPasswordService,
  signUpService,
} from "./services";
import { ErrorApp } from "@/common/types/erro";

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
  createSession: (params: CreateSessionHook) => void;
  signUp: (params: SignUpHook) => void;
  forgotPassword: (params: ForgotPasswordHook) => void;
  resetPassword: (params: ResetPasswordHook) => void;
  signOut: () => void;
};

const AuthContext = createContext(INITIAL_STATE as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [state, setState] = useState(() => {
    const isSigned = INITIAL_STATE.isSigned;
    if (isSigned !== undefined) return { ...INITIAL_STATE, isSigned: false };
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
    async (params: CreateSessionHook) => {
      setStateSafety({ isLoading: true });
      try {
        const result = createSessionService(params);
        setStateSafety({
          isSigned: true,
          isLoggedUser: result.collaborator,
          isLoading: false,
        });
      } catch (error) {
        const errorApp = error as ErrorApp;
        setStateSafety({
          isLoading: false,
        });
        enqueueSnackbar(errorApp.message, {
          variant: "warning",
        });
      }
    },
    [enqueueSnackbar, setStateSafety]
  );

  const forgotPassword = useCallback(
    (params: ForgotPasswordHook) => {
      setStateSafety({ isLoading: true });
      try {
        const resCodeTest = forgotPasswordService(params);
        enqueueSnackbar("E-mail enviado com sucesso!!", {
          variant: "success",
        });
        enqueueSnackbar(`Código: ${resCodeTest}`, {
          variant: "success",
        });
        navigate("/reset-password", { state: params });
        setStateSafety({ isLoading: false });
      } catch (error) {
        const errorApp = error as ErrorApp;

        setStateSafety({ isLoading: false });
        enqueueSnackbar(errorApp.message, {
          variant: "warning",
        });
      }
    },
    [setStateSafety, enqueueSnackbar, navigate]
  );
  const resetPassword = useCallback(
    (params: ResetPasswordHook) => {
      setStateSafety({ isLoading: true });
      try {
        resetPasswordService(params);
        enqueueSnackbar("Senha alterada com sucesso!!", {
          variant: "success",
        });
        navigate("/");
      } catch (error) {
        const errorApp = error as ErrorApp;
        setStateSafety({ isLoading: false });
        enqueueSnackbar(errorApp.message, {
          variant: "warning",
        });
      }
    },
    [setStateSafety, enqueueSnackbar, navigate]
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
    (params: SignUpHook) => {
      setStateSafety({ isLoading: true });
      try {
        signUpService(params);
        navigate("/");
        setStateSafety({ isLoading: false });
      } catch (error) {
        const errorApp = error as ErrorApp;
        setStateSafety({ isLoading: false });
        enqueueSnackbar(errorApp.message, {
          variant: "warning",
        });
      }
    },
    [enqueueSnackbar, navigate, setStateSafety]
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
