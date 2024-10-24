import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
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
      navigate('/');
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
    <section className="row justify-content-center">
      <article className="col-md-6 col-lg-5 card rounded bg-rosa shadow-sm">
        <section className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="field-container">
              <label htmlFor="user_email" className="form-label">
                E-post
              </label>
              <input
                type="email"
                id="user_email"
                className="form-control"
                {...register('user_email', { required: 'E-post krävs' })}
                placeholder="Ange din e-post"
              />
              {errors.user_email && <span>{errors.user_email.message}</span>}
            </fieldset>

            <fieldset className="field-container">
              <label htmlFor="user_password" className="form-label">
                Lösenord
              </label>
              <input
                type="password"
                id="user_password"
                className="form-control"
                {...register('user_password', {
                  required: 'Lösenord krävs',
                })}
                placeholder="Ange ditt lösenord"
              />
              {errors.user_password && (
                <span>{errors.user_password.message}</span>
              )}
            </fieldset>

            <fieldset className="field-container">
              <label htmlFor="confirm_password" className="form-label">
                Repetera lösenord
              </label>
              <input
                type="password"
                id="confirm_password"
                className="form-control"
                {...register('confirm_password', {
                  validate: (value) =>
                    value === password || 'Lösenorden matchar inte',
                })}
                placeholder="Upprepa ditt lösenord"
              />
              {errors.confirm_password && (
                <span>{errors.confirm_password.message}</span>
              )}
            </fieldset>

            <fieldset className="field-container">
              <label htmlFor="first_name" className="form-label">
                Förnamn
              </label>
              <input
                type="text"
                id="first_name"
                className="form-control"
                {...register('first_name', { required: 'Förnamn krävs' })}
                placeholder="Ange ditt förnamn"
              />
              {errors.first_name && <span>{errors.first_name.message}</span>}
            </fieldset>

            <fieldset className="field-container">
              <label htmlFor="last_name" className="form-label">
                Efternamn
              </label>
              <input
                type="text"
                id="last_name"
                className="form-control"
                {...register('last_name', { required: 'Efternamn krävs' })}
                placeholder="Ange ditt efternamn"
              />
              {errors.last_name && <span>{errors.last_name.message}</span>}
            </fieldset>

            <section className="button-group">
              <PrimaryBtn title="Avbryt" onClick={handleGoBack} />
              <PrimaryBtn title="Bli medlem" type="submit" />
            </section>
          </form>

          {error && <p className="alert alert-danger mt-3">{error}</p>}
          {success && <p className="alert alert-success mt-3">{success}</p>}
        </section>
      </article>
    </section>
  );
};

export default RegisterPage;
