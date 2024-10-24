import React from 'react';
import Rubrik from '../../components/rubrik/Rubrik';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './LoginPage.scss';

interface FormData {
  user_email: string;
  user_password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // Function to handle async login logic
  const handleLogin: SubmitHandler<FormData> = async (data) => {
    try {
      console.log('Login successful:', data);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Function to navigate to the registration page
  const handleRegisterRedirect = () => {
    navigate('/medlem/bli-medlem');
  };

  return (
    <>
      <Rubrik title="Logga In" />
      <section className="login-page-container">
        {' '}
        
        <div className="card">
          <form onSubmit={handleSubmit(handleLogin)} className="login-form">
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
                required
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
                required
              />
              {errors.user_password && (
                <p className="error-text">{errors.user_password.message}</p>
              )}
            </div>

            <div className="button-group">
              <button
                type="button"
                className="btn btn-custom-secondary"
                onClick={handleRegisterRedirect}
              >
                Bli Medlem
              </button>
              <button type="submit" className="btn btn-custom">
                Logga In
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
