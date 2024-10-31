import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { LoaderFunctionArgs } from 'react-router-dom';

interface Filters {
  age?: number;
  startDate?: string;
  endDate?: string;
  title?: string;
}

interface dateFormat {
  dayName: string;
  screeningDate: string;
}

interface Movie {
  movieId: number;
  title: string;
  posterUrl: string;
  age: number;
  screeningId: number;
  startDate: string;
  timeRange: string;
  dateFormat: dateFormat;
}

async function getFilter(filters: Filters) {
  const response = await axios.get<Movie[]>(`/api/movie`, {
    params: filters,
  });
  return response.data;
}

export const getFilterQuery = (filters: Filters) => ({
  queryKey: ['filter', filters],
  queryFn: async () => await getFilter(filters),
});

export const filterLoader =
  (client: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);

    const age = url.searchParams.get('alder') || undefined;
    const startDate = url.searchParams.get('startDatum') || undefined;
    const endDate = url.searchParams.get('slutDatum') || undefined;
    const title = url.searchParams.get('titel') || undefined;

    const filters: Filters = {
      age: age ? Number(age) : undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      title: title || undefined,
    };
    await client.ensureQueryData(getFilterQuery(filters));

    return { filters };
  };
