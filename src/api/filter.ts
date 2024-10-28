import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { LoaderFunctionArgs } from 'react-router-dom';

interface FormData {
  age?: number;
  date?: string;
  title?: string;
}

async function getFilter(formData: FormData) {
  const response = await axios.get(`/api/movie`, {
    params: formData,
  });
  return response.data;
}

export const getFilterQuery = (formData: FormData) => ({
  queryKey: ['filter', formData],
  queryFn: async () => await getFilter(formData),
});

export const filterLoader =
  (client: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    console.log(url);

    const age = url.searchParams.get('age') || undefined;
    const date = url.searchParams.get('date') || undefined;
    const title = url.searchParams.get('title') || undefined;

    const formData: FormData = {
      age: age ? Number(age) : undefined,
      date: date || undefined,
      title: title || undefined,
    };

    console.log(formData);

    await client.ensureQueryData(getFilterQuery(formData));

    return null;
  };
