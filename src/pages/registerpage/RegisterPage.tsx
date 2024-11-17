import { SubmitHandler, useForm } from 'react-hook-form';
import { useActionData, useNavigate, useSubmit } from 'react-router-dom';
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
  const submit = useSubmit();
  const navigate = useNavigate();
  const actionData = useActionData() as { error?: string };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    const jsonObject = Object.entries(data).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      },
      {}
    );

    submit(jsonObject, { method: 'post', action: '/user/register' });
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <Container className="d-flex justify-content-center">
      <Row className="col-md-6 col-lg-5 card rounded bg-rosa shadow-sm p-4">
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="user_email" className="field-container mb-3">
              <Form.Label className="form-label">E-post</Form.Label>
              <Form.Control
                type="email"
                className="form-control-field"
                placeholder="Ange din e-post"
                required
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
                required
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
                required
                {...register('confirm_password', {
                  validate: (value) =>
                    value === watch('user_password') ||
                    'Lösenorden matchar inte',
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
                required
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
                required
                {...register('last_name', { required: 'Efternamn krävs' })}
                isInvalid={!!errors.last_name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.last_name?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="button-group">
              <PrimaryBtn className="py-2 fs-md-custom" onClick={handleGoBack}>
                Avbryt
              </PrimaryBtn>
              <PrimaryBtn className="py-2 fs-md-custom" type="submit">
                Bli medlem
              </PrimaryBtn>
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

export default RegisterPage;
