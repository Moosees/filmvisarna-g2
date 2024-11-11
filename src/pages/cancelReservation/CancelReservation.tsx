import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Link, useActionData, useSubmit } from 'react-router-dom';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';

export interface CancelFormData extends FieldValues {
  email: string;
  reservationNum: string;
}

const CancelReservationPage: React.FC = () => {
  const submit = useSubmit();
  const actionData = useActionData() as { error?: string };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CancelFormData>();

  const onSubmit: SubmitHandler<CancelFormData> = (values) => {
    submit(values, { method: 'post', action: `/avbokning` });
  };

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
              controlId="reservationNum"
              className="field-container mb-3"
            >
              <Form.Label className="form-label">Bokningsnummer</Form.Label>
              <Form.Control
                type="text"
                className="form-control-field"
                placeholder="Fyll i ditt bokningsnummer"
                {...register('reservationNum', {
                  required: 'Bokningsnummer krävs',
                })}
                isInvalid={!!errors.reservationNum}
              />
              <Form.Control.Feedback type="invalid">
                {errors.reservationNum?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-between">
              <PrimaryBtn type="button">
                <Link to="/">Avbryt</Link>
              </PrimaryBtn>{' '}
              <PrimaryBtn type="submit">Gå vidare</PrimaryBtn>{' '}
            </div>
          </Form>

          {actionData?.error && (
            <Alert variant="danger" className="mt-3">
              {actionData.error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CancelReservationPage;
