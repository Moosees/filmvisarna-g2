import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import '../src/assets/sass/main.scss';
import { getQueryClient } from './api/clients';
import router from './router';

const colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches
  ? 'dark'
  : 'dark';
// : 'light';
document.documentElement.setAttribute('data-bs-theme', colorScheme);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={getQueryClient()}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);
