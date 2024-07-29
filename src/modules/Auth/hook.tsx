import { createContext, useCallback, useContext, useState } from "react";

import { CollaboratorModel } from "../Collaborators/types/model";
import {
  CreateSessionContext,
  ForgotPasswordContext,
  ResetPasswordContext,
} from "../Collaborators/types";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

interface AuthProps {
  isLoading: boolean;
  isSigned: boolean;
  isLoggedUser?: CollaboratorModel;
}

const INITIAL_STATE: AuthProps = {
  isLoading: false,
  isSigned: false,
  isLoggedUser: undefined,
};

type AuthContextProps = AuthProps & {
  createSession: (params: CreateSessionContext) => void;
  forgotPassword: (params: ForgotPasswordContext) => void;
  resetPassword: (params: ResetPasswordContext) => void;
  logout: () => void;
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
      const user: CollaboratorModel = {
        id: 1,
        uuid: "1234567890",
        name: "Victor",
        email: "victor@gmail.com",
        image: null,
        role: "Estudante",
        team: ["Frontend"],
        password: "12345",
      };
      const verifyUser = { email: user.email, password: "12345" };
      setStateSafety({ isLoading: true });
      try {
        if (
          verifyUser.email === params.email &&
          verifyUser.password === user.password
        ) {
          return setStateSafety({
            isSigned: true,
            isLoggedUser: user,
          });
        }
        setStateSafety({ isLoading: false });
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
    (params: ForgotPasswordContext) => {
      const isEmail = "victor@gmail.com";
      attempts++;
      setStateSafety({ isLoading: true });
      try {
        if (params === isEmail) {
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

  const logout = useCallback(() => {
    navigate("/");
    setStateSafety({
      isLoggedUser: undefined,
      isSigned: false,
      isLoading: false,
    });
  }, [navigate, setStateSafety]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        logout,
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
