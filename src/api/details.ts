import { QueryClient, queryOptions } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router-dom';
import { getAxios } from './clients';

interface MovieInfo {
  trailer: string;
  director: string;
  actors: string[];
  description: string;
  year_recorded: number;
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
async function getMovieData(movieId: number) {
  try {
    const response = await getAxios().get<MovieData>(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch movie data:', error);
    throw new Error('Failed to fetch movie data');
  }
}

export const getMovieDataQuery = (movieId: number) =>
  queryOptions({
    queryKey: ['movieId', movieId],
    queryFn: async () => await getMovieData(movieId),
  });

export const detailsLoader =
  (client: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const movieId = Number(params.id);
    if (isNaN(movieId)) {
      throw new Error('Invalid movie id');
    }

    await client.ensureQueryData(getMovieDataQuery(movieId));

    return { movieId };
  };
