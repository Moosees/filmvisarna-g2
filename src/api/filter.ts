import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { LoaderFunctionArgs } from 'react-router-dom';

interface Filters {
  age?: number;
  startDate?: string;
  endDate?: string;
  title?: string;
}

interface ScreeningDetail {
  dayName: string;
  startDate: string;
  timeRange: string;
  screeningId: number;
  screeningDate: string;
}

interface Movie {
  movieId: number;
  title: string;
  paramUrl: string;
  age: number;
  posterUrl: string;
  screeningDetails: ScreeningDetail[];
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
    console.log(url);

    const age = url.searchParams.get('alder') || undefined;
    const startDate = url.searchParams.get('startDate') || undefined;
    const endDate = url.searchParams.get('endDate') || undefined;
    const title = url.searchParams.get('titel') || undefined;

    const filters: Filters = {
      age: age ? Number(age) : undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      title: title || undefined,
    };

    console.log('Age:', age);
    console.log('sDate:', startDate);
    console.log('eDate:', endDate);
    console.log('Title:', title);
    console.log(filters);

    await client.ensureQueryData(getFilterQuery(filters));

    return { filters };
  };
