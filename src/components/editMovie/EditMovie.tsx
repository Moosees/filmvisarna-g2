import { MovieData } from '../../api/details';

interface EditMovieProps {
  movieData: MovieData | null;
}

function EditMovie({ movieData }: EditMovieProps) {
  return (
    <>
      <label>
        Titel
        <input type="text" defaultValue={movieData?.title} />
      </label>
    </>
  );
}

export default EditMovie;
