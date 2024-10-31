import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useActionData, useSubmit } from 'react-router-dom';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';

export interface CancelReservationFormData extends FieldValues {
  email: string;
  bookingNumber: string;
}

const CancelReservationPage: React.FC = () => {
  const submit = useSubmit();
  const error = useActionData() as string | null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CancelReservationFormData>();

  const onSubmit: SubmitHandler<CancelReservationFormData> = (values) =>
    submit(values, { method: 'post', action: '/reservation/cancel' });

  return (
    <Container className="d-flex justify-content-center">
      <Row className="col-md-6 col-lg-5 card rounded bg-rosa shadow-sm p-4">
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="email" className="field-container mb-3">
              <Form.Label className="form-label">Email</Form.Label>
              <Form.Control
                type="email"
                className="form-control-field"
                placeholder="Enter your email"
                {...register('email', { required: 'Email is required' })}
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
              <Form.Label className="form-label">Booking Number</Form.Label>
              <Form.Control
                type="text"
                className="form-control-field"
                placeholder="Enter your booking number"
                {...register('bookingNumber', {
                  required: 'Booking number is required',
                })}
                isInvalid={!!errors.bookingNumber}
              />
              <Form.Control.Feedback type="invalid">
                {errors.bookingNumber?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="button-group">
              <PrimaryBtn type="submit">Cancel Reservation</PrimaryBtn>
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
