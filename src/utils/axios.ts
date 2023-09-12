import axios, { AxiosRequestConfig } from 'axios';
// config
import { apiExpress } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: apiExpress });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) ||
        'Something went wrong'
    )
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (
  args: string | [string, AxiosRequestConfig]
) => {
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
    details: '/card/details/',
  },
  event: {
    all: '/event/all',
  },
};
