import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';

interface RegisterFormValues {
  user_email: string;
  user_password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
}

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const response = await axios.post('/api/user/register', data);
      setSuccess(
        `Användare registrerad med rollen "member", ID: ${response.data.id}`
      );
      setError(null);
      navigate('/medlem/logga-in');
    } catch (err: any) {
      setError('Något gick fel, försök igen!');
      setSuccess(null);
      console.error('Något gick fel', err);
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  const password = watch('user_password');

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Row className="col-md-6 col-lg-5 card rounded bg-rosa shadow-sm p-4">
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="user_email" className="field-container mb-3">
              <Form.Label className="form-label">E-post</Form.Label>
              <Form.Control
                type="email"
                className="form-control-field"
                placeholder="Ange din e-post"
                {...register('user_email', { required: 'E-post krävs' })}
                isInvalid={!!errors.user_email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.user_email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              controlId="user_password"
              className="field-container mb-3"
            >
              <Form.Label className="form-label">Lösenord</Form.Label>
              <Form.Control
                type="password"
                className="form-control-field"
                placeholder="Ange ditt lösenord"
                {...register('user_password', { required: 'Lösenord krävs' })}
                isInvalid={!!errors.user_password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.user_password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              controlId="confirm_password"
              className="field-container mb-3"
            >
              <Form.Label className="form-label">Repetera lösenord</Form.Label>
              <Form.Control
                type="password"
                className="form-control-field"
                placeholder="Upprepa ditt lösenord"
                {...register('confirm_password', {
                  validate: (value) =>
                    value === password || 'Lösenorden matchar inte',
                })}
                isInvalid={!!errors.confirm_password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirm_password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="first_name" className="field-container mb-3">
              <Form.Label className="form-label">Förnamn</Form.Label>
              <Form.Control
                type="text"
                className="form-control-field"
                placeholder="Ange ditt förnamn"
                {...register('first_name', { required: 'Förnamn krävs' })}
                isInvalid={!!errors.first_name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.first_name?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="last_name" className="field-container mb-3">
              <Form.Label className="form-label">Efternamn</Form.Label>
              <Form.Control
                type="text"
                className="form-control-field"
                placeholder="Ange ditt efternamn"
                {...register('last_name', { required: 'Efternamn krävs' })}
                isInvalid={!!errors.last_name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.last_name?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="button-group d-flex justify-content-between mt-3">
              <PrimaryBtn onClick={handleGoBack}>Avbryt</PrimaryBtn>
              <PrimaryBtn type="submit">Bli medlem</PrimaryBtn>
            </div>
          </Form>

          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
          {success && (
            <Alert variant="success" className="mt-3">
              {success}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
