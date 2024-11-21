import { QueryClient, queryOptions } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router-dom';
import { getAxios } from './clients';

interface MovieInfo {
  trailer: string;
  director: string;
  actors: string[];
  description: string;
  year_recorded: number;
  original_title: string;
  language: string;
  subtitle: string;
}

interface ScreeningDetails {
  dayName: string;
  timeRange: string;
  screeningId: number;
  screeningDate: string;
}

interface MovieData {
  message: string;
  movieId: number;
  title: string;
  paramUrl: string;
  playTime: number;
  posterUrl: string;
  age: number;
  movieInfo: MovieInfo;
  genres: string[];
  screeningDetails: ScreeningDetails[];
}

//-------------Movie-details---------------
async function getMovieData(paramUrl: string) {
  const response = await getAxios().get<MovieData>(`/movie/${paramUrl}`);
  return response.data;
}

export const getMovieDataQuery = (paramUrl: string) =>
  queryOptions({
    queryKey: ['paramUrl', paramUrl],
    queryFn: async () => await getMovieData(paramUrl),
  });

export const detailsLoader =
  (client: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const paramUrl = params.paramUrl;
    if (!paramUrl) {
      throw new Error('Ogiltigt filmId');
    }

    await client.ensureQueryData(getMovieDataQuery(paramUrl));

    return { paramUrl };
  };
