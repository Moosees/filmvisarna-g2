import { QueryClient } from '@tanstack/react-query';
import axios, { AxiosInstance } from 'axios';

let axiosInstance: AxiosInstance | null = null;

export function getAxios() {
  if (!axiosInstance) axiosInstance = axios.create({ baseURL: '/api' });

  return axiosInstance;
}

let queryClient: QueryClient | null = null;

export function getQueryClient() {
  if (!queryClient) queryClient = new QueryClient();

  return queryClient;
}
