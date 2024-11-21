import { SubmitHandler, useForm } from 'react-hook-form';
import { useActionData, useNavigate, useSubmit } from 'react-router-dom';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';
import InputWrapper from '../../components/form/InputWrapper';

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
    const trimmedData = Object.entries(data).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        acc[key] = typeof value === 'string' ? value.trim() : value;
        return acc;
      },
      {}
    );

    submit(trimmedData, { method: 'post', action: '/medlem/bli-medlem' });
  };

  const handleGoBack = () => navigate('/');

  return (
    <Container className="d-flex justify-content-center">
      <Row className="col-md-6 col-lg-5 card rounded bg-rosa shadow-sm p-4">
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputWrapper
              controlId="user_email"
              label="E-post"
              className="mb-3"
              errorMsg={errors.user_email?.message}
            >
              <Form.Control
                className="form-control-field"
                placeholder="Ange din e-post"
                {...register('user_email', {
                  required: 'E-post krävs',
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    message: 'Var god skriv in en giltig e-postadress',
                  },
                })}
                isInvalid={!!errors.user_email}
              />
            </InputWrapper>

            <InputWrapper
              controlId="user_password"
              label="Lösenord"
              className="mb-3"
              errorMsg={errors.user_password?.message}
            >
              <Form.Control
                type="password"
                className="form-control-field"
                placeholder="Ange ditt lösenord"
                {...register('user_password', {
                  required: 'Lösenord är obligatoriskt',
                  minLength: {
                    value: 6,
                    message: 'Lösenordet måste vara minst 6 tecken långt',
                  },
                  maxLength: {
                    value: 128,
                    message: 'Lösenordet får inte vara längre än 128 tecken',
                  },
                })}
                isInvalid={!!errors.user_password}
              />
            </InputWrapper>

            <InputWrapper
              controlId="confirm_password"
              label="Repetera lösenord"
              className="mb-3"
              errorMsg={errors.confirm_password?.message}
            >
              <Form.Control
                type="password"
                className="form-control-field"
                placeholder="Upprepa ditt lösenord"
                {...register('confirm_password', {
                  validate: (value) =>
                    value === watch('user_password') ||
                    'Lösenorden matchar inte',
                })}
                isInvalid={!!errors.confirm_password}
              />
            </InputWrapper>

            <InputWrapper
              controlId="first_name"
              label="Förnamn"
              className="mb-3"
              errorMsg={errors.first_name?.message}
            >
              <Form.Control
                type="text"
                className="form-control-field"
                placeholder="Ange ditt förnamn"
                {...register('first_name', {
                  required: 'Förnamn är obligatoriskt',
                  pattern: {
                    value: /^[a-zA-Zà-öÀ-Ö\s-]+$/,
                    message:
                      'Förnamnet får bara innehålla bokstäver, mellanslag och bindestreck',
                  },
                })}
                isInvalid={!!errors.first_name}
              />
            </InputWrapper>

            <InputWrapper
              controlId="last_name"
              label="Efternamn"
              className="mb-3"
              errorMsg={errors.last_name?.message}
            >
              <Form.Control
                type="text"
                className="form-control-field"
                placeholder="Ange ditt efternamn"
                {...register('last_name', {
                  required: 'Efternamn är obligatoriskt',
                  pattern: {
                    value: /^[a-zA-Zà-öÀ-Ö\s-]+$/,
                    message:
                      'Efternamnet får bara innehålla bokstäver, mellanslag och bindestreck',
                  },
                })}
                isInvalid={!!errors.last_name}
              />
            </InputWrapper>

            <div className="button-group d-flex justify-content-between">
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
