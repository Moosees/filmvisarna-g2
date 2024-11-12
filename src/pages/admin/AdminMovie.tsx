import { useSuspenseQuery } from '@tanstack/react-query';
import { Form } from 'react-bootstrap';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useLoaderData, useSubmit } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMovieDataQuery, MovieData } from '../../api/details';

interface EditMovieData extends MovieData, FieldValues {}

function AdminMovieEdit() {
  const { movieId } = useLoaderData() as { movieId: number };
  const { data: movieData } = useSuspenseQuery(getMovieDataQuery(movieId));
  console.log({ movieData });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditMovieData>();

  const submit = useSubmit();
  const onSubmit: SubmitHandler<EditMovieData> = (values) => {
    submit(values, { method: 'post', action: '/admin/film' });

    toast.success('Filmen är sparad', {
      closeOnClick: true,
      autoClose: 3000,
      hideProgressBar: true,
    });
  };

  return (
    <Form className="container" onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col col-6">
          <Form.Group controlId="title" className="field-container mb-3">
            <Form.Label className="form-label">Filmtitel</Form.Label>
            <Form.Control
              defaultValue={movieData?.title}
              type="title"
              className="form-control-field"
              placeholder="Primär titel"
              {...register('title', { required: 'Titeln är obligatorisk' })}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
      </div>
    </Form>
  );
}

export default AdminMovieEdit;
