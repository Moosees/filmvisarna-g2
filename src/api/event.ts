import { QueryClient, queryOptions } from '@tanstack/react-query';
import { getAxios } from './clients';

interface DateFormat {
  dayName: string;
  screeningDate: string;
}

interface ScaryMoviesData {
  movieId: number;
  title: string;
  posterUrl: string;
  age: number;
  startTime: string;
  screeningId: number;
  dateFormat: DateFormat;
  fullDate: string;
}

async function getScaryMovies() {
  const response = await getAxios().get<ScaryMoviesData[]>(
    `/event/scary-movies`
  );
  return response.data;
}

export const getScaryMovieQuery = () =>
  queryOptions({
    queryKey: ['scaryMovies'],
    queryFn: async () => await getScaryMovies(),
  });

export const ScaryMoviesLoader = (client: QueryClient) => async () => {
  await client.ensureQueryData(getScaryMovieQuery());

  return null;
};
