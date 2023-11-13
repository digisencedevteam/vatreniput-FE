import axios, { AxiosRequestConfig } from 'axios';
// config
import { apiExpress } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: apiExpress, withCredentials: true });

axios.defaults.withCredentials = true;


axiosInstance.interceptors.response.use(
  (response) => response, 
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && originalRequest.url === '/auth/refresh') {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axiosInstance.post('/auth/refresh');
        const { accessToken } = response.data;
        
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject((error.response && error.response.data) || 'Something went wrong');
  }
);

export default axiosInstance;

// ----------------------------------------------------------------------

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
    refreshToken: '/auth/refresh'
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
