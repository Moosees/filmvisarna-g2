import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Link, useActionData, useSubmit } from 'react-router-dom';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';

export interface LoginFormData extends FieldValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const submit = useSubmit();
  const actionData = useActionData() as { error?: string };
  // const [loginAttempted, setLoginAttempted] = useState(false);

  // const { data } = useSuspenseQuery({
  //   ...getRootDataQuery(),
  //   refetchOnWindowFocus: false,
  //   staleTime: 0,
  // });

  // const isLoggedIn = data?.isLoggedIn;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit: SubmitHandler<LoginFormData> = (values) => {
    submit(values, { method: 'post', action: '/medlem/logga-in' });
    // setLoginAttempted(true);
  };

  // useEffect(() => {
  //   if (loginAttempted && !actionData?.error) {
  //     // Show toast on successful login after submit attempt
  //     toast.success('Du är nu inloggad', {
  //       closeOnClick: true,
  //       autoClose: 3000,
  //       hideProgressBar: true,
  //     });
  //     setLoginAttempted(false); // Reset the attempt state
  //   }
  // }, [actionData, loginAttempted]);

  return (
    <Container className="d-flex justify-content-center">
      <Row className="col-md-6 col-lg-5 card rounded bg-rosa shadow-sm p-4">
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="email" className="field-container mb-3">
              <Form.Label className="form-label">E-post</Form.Label>
              <Form.Control
                type="email"
                className="form-control-field"
                placeholder="Ange din e-postadress"
                {...register('email', { required: 'E-post är obligatorisk' })}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password" className="field-container mb-3">
              <Form.Label className="form-label">Lösenord</Form.Label>
              <Form.Control
                type="password"
                className="form-control-field"
                placeholder="Ange ditt lösenord"
                {...register('password', {
                  required: 'Lösenord är obligatoriskt',
                })}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="button-group">
              <PrimaryBtn className="py-2 fs-md-custom">
                <Link to="/medlem/bli-medlem">Bli medlem</Link>
              </PrimaryBtn>
              <PrimaryBtn className="py-2 fs-md-custom" type="submit">
                Logga in
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

export default LoginPage;
