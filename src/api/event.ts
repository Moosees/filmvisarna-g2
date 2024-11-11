import { QueryClient, queryOptions } from '@tanstack/react-query';
import { getAxios } from './clients';

interface ScaryMoviesData {
  movieId: number;
  posterUrl: string;
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

interface AstridLindgrenMoviesData {
  movieId: number;
  posterUrl: string;
}

async function AstridLindgrenMovies() {
  const response = await getAxios().get<AstridLindgrenMoviesData[]>(
    `/event/astrid-lindgren`
  );
  return response.data;
}

export const AstridLindgrenMovieQuery = () =>
  queryOptions({
    queryKey: ['astridLindgrenMovies'],
    queryFn: async () => await AstridLindgrenMovies(),
  });

export const AstridLindgrenMoviesLoader = (client: QueryClient) => async () => {
  await client.ensureQueryData(AstridLindgrenMovieQuery());

  return null;
};
