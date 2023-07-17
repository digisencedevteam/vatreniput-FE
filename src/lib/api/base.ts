import axios from 'axios';
import { AxiosRequestConfig, Method } from 'axios';

export const requestMethods = {
  GET: 'get' as Method,
  POST: 'post' as Method,
  PUT: 'put' as Method,
  PATCH: 'patch' as Method,
  DELETE: 'delete' as Method,
  HEAD: 'head' as Method,
};

export const fetcher = async (options: AxiosRequestConfig) => {
  const request = axios(options);
  const response = await request;
  if (response instanceof Error) {
    throw response;
  }
  return response.data;
};
