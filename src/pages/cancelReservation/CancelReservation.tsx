import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useActionData, useNavigate, useSubmit } from 'react-router-dom';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';

export interface CancelReservationFormData extends FieldValues {
  email: string;
  bookingNumber: string;
}

const CancelReservationPage: React.FC = () => {
  const submit = useSubmit();
  const navigate = useNavigate();
  const error = useActionData() as string | null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CancelReservationFormData>();

  const onSubmit: SubmitHandler<CancelReservationFormData> = (values) =>
    submit(values, { method: 'post', action: '/avbokning/:reservationNum' });

  return (
    <Container className="d-flex justify-content-center">
      <Row className="col-md-6 col-lg-5 card rounded bg-rosa shadow-sm p-4">
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="email" className="field-container mb-3">
              <Form.Label className="form-label">Epost</Form.Label>
              <Form.Control
                type="email"
                className="form-control-field"
                placeholder="Fyll i din epost"
                {...register('email', { required: 'Epost krävs' })}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              controlId="bookingNumber"
              className="field-container mb-3"
            >
              <Form.Label className="form-label">Bokningsnummer</Form.Label>
              <Form.Control
                type="text"
                className="form-control-field"
                placeholder="Fyll i ditt bokningsnummer"
                {...register('bookingNumber', {
                  required: 'Bokningsnummer krävs',
                })}
                isInvalid={!!errors.bookingNumber}
              />
              <Form.Control.Feedback type="invalid">
                {errors.bookingNumber?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-between">
              <PrimaryBtn type="button" onClick={() => navigate('/')}>
                Avbryt
              </PrimaryBtn>{' '}
              <PrimaryBtn type="submit">Gå vidare</PrimaryBtn>{' '}
            </div>
          </Form>

          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CancelReservationPage;
