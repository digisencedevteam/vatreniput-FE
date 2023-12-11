import { paths } from 'src/routes/paths';
import axiosInstance from 'src/utils/axios';
import { endpoints } from 'src/utils/axios';

function jwtDecode(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );
  return JSON.parse(jsonPayload);
}

export const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};

export const tokenExpired = async (exp: number) => {
  let expiredTimer;
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;
  clearTimeout(expiredTimer);
  expiredTimer = setTimeout(() => {
    sessionStorage.removeItem('accessToken');
    window.location.href = paths.auth.jwt.login;
  }, timeLeft);
};

export const setSession = (accessToken: string | null) => {
  if (accessToken) {
    sessionStorage.setItem('accessToken', accessToken);
    axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
    const { exp } = jwtDecode(accessToken);
    tokenExpired(exp);
  } else {
    sessionStorage.removeItem('accessToken');
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

export const refreshAccessToken = async () => {
  try {
    const response = await axiosInstance.get(endpoints.auth.refreshToken);
    const { accessToken } = response.data;
    setSession(accessToken);
  } catch (error) {
    console.error('Error during token refresh:', error);
    setSession(null);
    window.location.href = paths.auth.jwt.login;
  }
};
