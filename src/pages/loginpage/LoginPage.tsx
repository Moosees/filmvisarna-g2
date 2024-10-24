import React from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';
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

  const handleLogin: SubmitHandler<FormData> = async (data) => {
    try {
      // Send a POST request to the login endpoint
      const response = await axios.post('/api/user', {
        user_email: data.user_email,
        user_password: data.user_password,
      });

      console.log('Login successful:', response.data);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      navigate('/'); // Redirect to the home page after successful login
    } catch (error: any) {
      console.error('Login failed:', error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert('An unknown error occurred.');
      }
    }
  };

  // Function to navigate to the registration page
  const handleRegisterRedirect = () => {
    navigate('/medlem/bli-medlem');
  };

  return (
    <>
      <section className="login-page-container">
        <div className="login-card">
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
              <PrimaryBtn title="Bli Medlem" onClick={handleRegisterRedirect} />

              <PrimaryBtn title="Logga In" type="submit" />
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
