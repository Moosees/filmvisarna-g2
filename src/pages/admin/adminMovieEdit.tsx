import { useSuspenseQuery } from '@tanstack/react-query';
import { Form, useLoaderData } from 'react-router-dom';
import { getMovieDataQuery } from '../../api/details';
import EditMovie from '../../components/editMovie/EditMovie';

function AdminMovieEdit() {
  const { movieId } = useLoaderData() as { movieId: number };
  const { data: movieData } = useSuspenseQuery(getMovieDataQuery(movieId));
  console.log({ movieData });

  return (
    <Form>
      <EditMovie movieData={movieData} />
    </Form>
  );
}

export default AdminMovieEdit;
