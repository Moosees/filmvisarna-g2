import { useSuspenseQuery } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';
import { getMovieDataQuery } from '../../api/details';

function AdminMovieEdit() {
  const { movieId } = useLoaderData() as { movieId: number };
  const { data: movieData } = useSuspenseQuery(getMovieDataQuery(movieId));
  console.log({ movieData });

  return <div>edit movie</div>;
}

export default AdminMovieEdit;
