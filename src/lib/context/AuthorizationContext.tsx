import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { token } from '../config';
import { AUTH_ACTIONS, authReducer } from './authReducer';

type GlobalAction = {
  continueLoading?: boolean;
  type: string;
  payload?: any;
  error?: string;
  pathname?: string;
};

export interface UserData {
  _id: string;
  email: string;
  username: string;
}
const defaultUseData = {
  _id: '0',
  email: '',
  username: '',
};
export interface IContextProps {
  userData: UserData;
  jwt: string | undefined;
  setJwt: (jwt: string | undefined) => void;
  dispatch?: React.Dispatch<GlobalAction>;
}

const AuthorizationContext = createContext({} as IContextProps);

type Props = {
  initialUser?: any;
  children: ReactNode;
};

export const AuthorizationContextProvider = ({
  initialUser = {},
  children,
}: Props) => {
  const [jwt, setJwt] = useState<string | undefined>(token);
  const [state, dispatch] = useReducer(authReducer, {
    userData: {
      ...defaultUseData,
      ...initialUser,
    },
    jwt: '',
    setJwt,
  });

  useEffect(() => {
    if (Object.keys(initialUser).length !== 0)
      dispatch({
        type: AUTH_ACTIONS.GET_USER_SUCCESS,
        payload: initialUser,
      });
  }, [JSON.stringify(initialUser)]);

  const value = {
    ...state,
    dispatch,
  };

  return (
    <AuthorizationContext.Provider value={value}>
      {children}
    </AuthorizationContext.Provider>
  );
};

export const useAuthorizationContext = () => {
  const value = useContext(AuthorizationContext);
  return value;
};
