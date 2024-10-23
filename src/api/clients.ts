import { QueryClient } from '@tanstack/react-query';
import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'http://localhost:5173/api';

let axiosInstance: AxiosInstance | null = null;

export function getAxios() {
  if (!axiosInstance) axiosInstance = axios.create({ baseURL: BASE_URL });

  return axiosInstance;
}

let queryClient: QueryClient | null = null;

export function getQueryClient() {
  if (!queryClient) queryClient = new QueryClient();

  return queryClient;
}
