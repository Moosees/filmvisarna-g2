import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface FormData {
  user_email: string;
  user_password: string;
}

const LoginPage: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // Simulate login request
      console.log('Login successful:', data);
      // Redirect after successful login
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

      <section className="card">
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div className="mb-3">
            <label htmlFor="email" className="email">
              E-post
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              {...register('user_email', { required: true })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Lösenord
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              {...register('user_password', { required: true })}
            />
          </div>
          <div className="button-group">
            <button type="submit" className="btn btn-primary">
              Logga In
            </button>
            <button
              type="button"
              className="btn btn-secondary ml-2"
              onClick={handleRegisterRedirect}
            >
              Bli Medlem
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default LoginPage;
