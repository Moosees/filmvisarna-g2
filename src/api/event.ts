import { QueryClient, queryOptions } from '@tanstack/react-query';
import { getAxios } from './clients';

interface EventMoviesData {
  movieId: number;
  posterUrl: string;
  paramUrl: string;
  movieTitle: string;
}

async function getScaryMovies() {
  const response = await getAxios().get<EventMoviesData[]>(
    `/event/scary-movies`
  );
  return response.data;
}

export const getScaryMovieQuery = () =>
  queryOptions({
    queryKey: ['scaryMovies'],
    queryFn: async () => await getScaryMovies(),
  });

async function AstridLindgrenMovies() {
  const response = await getAxios().get<EventMoviesData[]>(
    `/event/astrid-lindgren`
  );
  return response.data;
}

export const AstridLindgrenMovieQuery = () =>
  queryOptions({
    queryKey: ['astridLindgrenMovies'],
    queryFn: async () => await AstridLindgrenMovies(),
  });

export const eventMoviesLoader = (client: QueryClient) => async () => {
  await client.ensureQueryData(getScaryMovieQuery());
  await client.ensureQueryData(AstridLindgrenMovieQuery());

  return null;
};
