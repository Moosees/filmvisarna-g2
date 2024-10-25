import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Link, useActionData, useSubmit } from 'react-router-dom';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';

export interface LoginFormData extends FieldValues {
  user_email: string;
  user_password: string;
}

const LoginPage: React.FC = () => {
  const submit = useSubmit();
  const error = useActionData();
  console.log({ error });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit: SubmitHandler<LoginFormData> = (values) =>
    submit(values, { method: 'post', action: '/medlem/logga-in' });

  return (
    <section className="login-page-container">
      <div className="login-card">
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div className="field-container">
            <label htmlFor="email" className="form-label">
              E-post
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              {...register('user_email', {
                required: 'E-post är obligatorisk',
              })}
              placeholder="Ange din e-postadress"
            />
            {errors.user_email && (
              <p className="error-text">{errors.user_email.message}</p>
            )}
          </div>

          <div className="field-container">
            <label htmlFor="password" className="form-label">
              Lösenord
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              {...register('user_password', {
                required: 'Lösenord är obligatoriskt',
              })}
              placeholder="Ange ditt lösenord"
            />
            {errors.user_password && (
              <p className="error-text">{errors.user_password.message}</p>
            )}
          </div>

          <div className="button-group">
            <Link to="/medlem/bli-medlem">
              <PrimaryBtn title="Bli Medlem" />
            </Link>
            <PrimaryBtn title="Logga In" type="submit" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
