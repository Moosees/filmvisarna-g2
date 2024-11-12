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
              type="text"
              className="form-control-field"
              placeholder="Primär titel"
              {...register('title', { required: 'Titeln är obligatorisk' })}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>
          {/* <Form.Group controlId="altTitle" className="field-container mb-3"> */}
          {/*   <Form.Label className="form-label">Alternativ titel</Form.Label> */}
          {/*   <Form.Control */}
          {/*     defaultValue={movieData?.altTitle} */}
          {/*     type="text" */}
          {/*     className="form-control-field" */}
          {/*     placeholder="Alternativ/original titel" */}
          {/* {...register('altTitle', { required: false })} */}
          {/*     isInvalid={!!errors.altTitle} */}
          {/*   /> */}
          {/*   <Form.Control.Feedback type="invalid"> */}
          {/*     {errors.altTitle?.message} */}
          {/*   </Form.Control.Feedback> */}
          {/* </Form.Group> */}
          <Form.Group controlId="playTime" className="field-container mb-3">
            <Form.Label className="form-label">Speltid</Form.Label>
            <Form.Control
              defaultValue={movieData?.playTime}
              type="number"
              className="form-control-field"
              placeholder="Tid i minuter"
              {...register('playTime', {
                required: 'Speltid är obligatorisk',
                min: 0,
                max: 999,
              })}
              isInvalid={!!errors.playTime}
            />
            <Form.Control.Feedback type="invalid">
              {errors.playTime?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="age" className="field-container mb-3">
            <Form.Label className="form-label">Åldersgräns</Form.Label>
            <Form.Select
              defaultValue={movieData?.age || 11}
              className="form-control-field"
              {...register('age', { required: 'Ålder är obligatorisk' })}
              isInvalid={!!errors.age}
            >
              <option value={1}>Barntillåten</option>
              <option value={7}>Från 7 år</option>
              <option value={11}>Från 11 år</option>
              <option value={15}>Från 15 år</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.age?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="posterUrl" className="field-container mb-3">
            <Form.Label className="form-label">Filmposter</Form.Label>
            <Form.Control
              defaultValue={movieData?.posterUrl}
              type="text"
              className="form-control-field"
              placeholder="Url till poster"
              {...register('posterUrl', { required: 'Poster är obligatorisk' })}
              isInvalid={!!errors.posterUrl}
            />
            <Form.Control.Feedback type="invalid">
              {errors.posterUrl?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
      </div>
    </Form>
  );
}

export default AdminMovieEdit;
