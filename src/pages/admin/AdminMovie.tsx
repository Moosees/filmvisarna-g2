import { useSuspenseQuery } from '@tanstack/react-query';
import { Form } from 'react-bootstrap';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useLoaderData, useSubmit } from 'react-router-dom';
import { getMovieDataQuery, MovieData } from '../../api/details';
import { getRootDataQuery } from '../../api/root';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';

interface EditMovieData extends MovieData, FieldValues {}

function AdminMovieEdit() {
  const { movieId } = useLoaderData() as { movieId: number };
  const { data: movieData } = useSuspenseQuery(getMovieDataQuery(movieId));
  const {
    data: { isAdmin },
  } = useSuspenseQuery(getRootDataQuery());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditMovieData>();

  const submit = useSubmit();
  const onSubmit: SubmitHandler<EditMovieData> = (values) => {
    if (!isAdmin) return;
    submit(values, { method: 'post' });
  };

  if (!isAdmin) return <div>Endast administratörer, var god logga in</div>;

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
              placeholder="Beetlejuice"
              {...register('title', { required: 'Titeln är obligatorisk' })}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            controlId="original_title"
            className="field-container mb-3"
          >
            <Form.Label className="form-label">Alternativ titel</Form.Label>
            <Form.Control
              defaultValue={movieData?.original_title}
              type="text"
              className="form-control-field"
              placeholder="Alternativ titel"
              {...register('original_title', { required: false })}
              isInvalid={!!errors.original_title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.original_title?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="playTime" className="field-container mb-3">
            <Form.Label className="form-label">Speltid i minuter</Form.Label>
            <Form.Control
              defaultValue={movieData?.playTime || 92}
              type="number"
              className="form-control-field"
              placeholder="92"
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

          <Form.Group
            controlId="year_recorded"
            className="field-container mb-3"
          >
            <Form.Label className="form-label">Inspelningsår</Form.Label>
            <Form.Control
              defaultValue={movieData?.year_recorded || 1988}
              type="number"
              className="form-control-field"
              placeholder="1988"
              {...register('year_recorded', {
                required: false,
                min: 1900,
                max: 2100,
              })}
              isInvalid={!!errors.year_recorded}
            />
            <Form.Control.Feedback type="invalid">
              {errors.year_recorded?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="director" className="field-container mb-3">
            <Form.Label className="form-label">Regissör</Form.Label>
            <Form.Control
              defaultValue={movieData?.director}
              type="text"
              className="form-control-field"
              placeholder="Tim Burton"
              {...register('director', { required: false })}
              isInvalid={!!errors.director}
            />
            <Form.Control.Feedback type="invalid">
              {errors.director?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="actors" className="field-container mb-3">
            <Form.Label className="form-label">Skådespelare</Form.Label>
            <Form.Control
              defaultValue={movieData?.actors}
              type="text"
              className="form-control-field"
              placeholder="Alec Baldwin, Geena Davis"
              {...register('actors', { required: false })}
              isInvalid={!!errors.actors}
            />
            <Form.Control.Feedback type="invalid">
              {errors.actors?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="description" className="field-container mb-3">
            <Form.Label className="form-label">Beskrivning</Form.Label>
            <Form.Control
              defaultValue={movieData?.description}
              as="textarea"
              rows={4}
              className="form-control-field"
              placeholder="Beetlejuice, beetlejuice, beetlejuice"
              {...register('description', { required: false })}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="language" className="field-container mb-3">
            <Form.Label className="form-label">Språk</Form.Label>
            <Form.Control
              defaultValue={movieData?.language}
              type="text"
              className="form-control-field"
              placeholder="Engelska"
              {...register('language', { required: false })}
              isInvalid={!!errors.language}
            />
            <Form.Control.Feedback type="invalid">
              {errors.language?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="subtitle" className="field-container mb-3">
            <Form.Label className="form-label">Undetexter</Form.Label>
            <Form.Control
              defaultValue={movieData?.subtitle}
              type="text"
              className="form-control-field"
              placeholder="Svenska"
              {...register('subtitle', { required: false })}
              isInvalid={!!errors.subtitle}
            />
            <Form.Control.Feedback type="invalid">
              {errors.subtitle?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="trailer" className="field-container mb-3">
            <Form.Label className="form-label">Filmtrailer</Form.Label>
            <Form.Control
              defaultValue={movieData?.trailer}
              type="text"
              className="form-control-field"
              placeholder="Url till trailer"
              {...register('trailer', { required: false })}
              isInvalid={!!errors.trailer}
            />
            <Form.Control.Feedback type="invalid">
              {errors.trailer?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <PrimaryBtn type="submit">Spara</PrimaryBtn>
        </div>
      </div>
    </Form>
  );
}

export default AdminMovieEdit;
