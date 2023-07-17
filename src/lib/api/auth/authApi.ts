import {
  apiExpress,
  getUpdatedHeader,
  options as defaultHeaders,
} from '../../config';
import { fetcher, requestMethods } from '../base';

const { GET, POST } = requestMethods;

type AuthParams = {
  email: string;
  password: string;
};
type AuthResponse = {
  accessToken: string;
};

export const fetchUserData = async () => {
  const { bearerToken: headers } =
    getUpdatedHeader() || defaultHeaders;

  const options = {
    url: '/auth/user',
    baseURL: apiExpress,
    method: GET,
    headers,
  };

  const data = await fetcher(options).catch((err) => err);
  if (data instanceof Error) {
    throw data;
  }

  data.authCalled = true;
  return data;
};

export const login = async ({ email, password }: AuthParams) => {
  const { bearerToken: headers } = defaultHeaders;

  const options = {
    url: `/user/login`,
    baseURL: apiExpress,
    method: POST,
    headers,
    data: { email, password },
  };

  const loginData: AuthResponse = await fetcher(options).catch(
    (err) => err
  );
  if (loginData instanceof Error) {
    throw new Error(loginData.message);
  }

  return loginData;
};
