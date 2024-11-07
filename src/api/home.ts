import { QueryClient, queryOptions } from '@tanstack/react-query';
import { getAxios } from './clients';

interface DateFormat {
  dayName: string;
  screeningDate: string;
}

interface TodaysMoviesData {
  movieId: number;
  title: string;
  posterUrl: string;
  age: number;
  startTime: string;
  screeningId: number;
  dateFormat: DateFormat;
  fullDate: string;
}

//-------------todays-movies---------------
async function getTodaysMovies() {
  const response = await getAxios().get<TodaysMoviesData[]>(`/todaysMovies`);
  return response.data;
}

export const getTodaysMoviesQuery = () =>
  queryOptions({
    queryKey: ['todaysMovies'],
    queryFn: async () => await getTodaysMovies(),
  });

export const TodaysMoviesLoader = (client: QueryClient) => async () => {
  await client.ensureQueryData(getTodaysMoviesQuery());

  return null;
};
