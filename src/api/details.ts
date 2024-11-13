import { QueryClient, queryOptions } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router-dom';
import { getAxios } from './clients';

interface ScreeningDetails {
  dayName: string;
  timeRange: string;
  screeningId: number;
  screeningDate: string;
}

export interface MovieData {
  movieId: number;
  paramUrl: string;
  title: string;
  altTitle: string;
  playTime: number;
  age: number;
  posterUrl: string;
  yearRecorded: number;
  director: string;
  actors: string[];
  description: string;
  language: string;
  subtitles: string;
  trailer: string;
  genres: string[];
  screeningDetails: ScreeningDetails[];
}

//-------------Movie-details---------------
async function getMovieData(movieId: number) {
  if (movieId === -1) return null;

  const response = await getAxios().get<MovieData>(`/movie/${movieId}`);
  return response.data;
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
      throw new Error('Ogiltigt filmId');
    }

    await client.ensureQueryData(getMovieDataQuery(movieId));

    return { movieId };
  };
