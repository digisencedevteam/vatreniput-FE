import { IContextProps } from './AuthorizationContext';
import { toString } from '../utils/functions';

const JWT_DECODED = 'JWT_DECODED';
const GET_USER_START = 'GET_USER_START';
const GET_USER_ERROR = 'GET_USER_ERROR';
const GET_USER_SUCCESS = 'GET_USER_SUCCESS';

type GlobalAction = {
  continueLoading?: boolean;
  type: string;
  payload?: any;
  error?: string;
  pathname?: string;
};

export const authReducer = (
  state: IContextProps,
  action: GlobalAction
): IContextProps => {
  const { payload, type } = action;
  switch (type) {
    case GET_USER_SUCCESS: {
      return {
        ...state,
        userData: { ...state.userData, ...toString(payload) },
      };
    }
    case JWT_DECODED: {
      return {
        ...state,
        userData: { ...state.userData, ...payload },
      };
    }
    default:
      return state;
  }
};

export const AUTH_ACTIONS = {
  JWT_DECODED,
  GET_USER_START,
  GET_USER_ERROR,
  GET_USER_SUCCESS,
};
