import axios, { AxiosRequestConfig } from 'axios';
import { apiExpress } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: apiExpress, withCredentials: true });
axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url === endpoints.auth.login) {
      return Promise.reject(error);
    }
    if (!error.response) {
      console.error('Network error or server is not responding');
      return Promise.reject(new Error('Network error or server down'));
    }
    if (error.response.status === 401) {
      if (originalRequest.url === endpoints.auth.refreshToken) {
        sessionStorage.removeItem('accessToken');
        return Promise.reject(error);
      }
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshResponse = await axiosInstance.get(endpoints.auth.refreshToken);
          if (refreshResponse.data.accessToken) {
            const { accessToken } = refreshResponse.data;
            sessionStorage.setItem('accessToken', accessToken);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {          
          console.error('Error refreshing token:', refreshError);
          sessionStorage.removeItem('accessToken');
          return Promise.reject(refreshError);
        }
      }
    }
    if (error.response.status === 403) {
      console.error('You do not have permission to access this resource.');
      return Promise.reject(error);
    }
    if (error.response.status === 404) {
      console.error('Requested resource not found.');
      return Promise.reject(error);
    }
    if (error.response.status === 500) {
      console.error('Internal server error. Please try again later.');
      return Promise.reject(error);
    }
    console.error(`An error occurred: ${error.response.status}`);
    return Promise.reject((error.response && error.response.data) || 'Something went wrong');
  }
);
export default axiosInstance;

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];
  const res = await axiosInstance.get(url, { ...config });
  return res.data;
};

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  album: {
    validate: '/album/validate/',
  },
  auth: {
    me: '/auth/user',
    login: '/user/login',
    register: '/user/register/',
    refreshToken: '/auth/refresh',
    logout: '/auth/logout'
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
  user: {
    user: '/user/',
  },
  card: {
    collected: '/card/collected/',
    add: '/card/add/',
    event: '/card/event',
    stats: '/card/stats/all',
    statsDashboard: '/card/stats/dashboard',
    details: '/card/details/',
  },
  event: {
    all: '/event/all',
  },
  quiz: {
    details: '/quizzes/',
    resolved: '/quizzes/resolved',
    unresolved: '/quizzes/unresolved',
    new: '/quizzes/new',
    deleteAndUpdate: '/quizzes/',
    results: '/quizzes/results',
    all: '/quizzes/all',
    inProgressQuizUpdate: '/quizzes/update-answer'
  },
  votings: {
    all: '/votings/',
    submitAndDelete: '/votings/vote'
  },
  passwordReset: {
    reqest: '/password-reset/request',
    reset: '/password-reset/reset',
  },
};
