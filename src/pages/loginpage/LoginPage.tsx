import React from 'react';
import Rubrik from '../../components/rubrik/Rubrik';
import { useForm } from '@tanstack/react-form';
import { useNavigate } from 'react-router-dom';

interface FormData {
  user_email: string;
  user_password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  // Define the form using @tanstack/react-form
  const form = useForm<FormData>({
    onSubmit: async (data) => {
      // Handle form submission as a separate function
      // await handleLogin(data);
    },
    defaultValues: {
      user_email: '',
      user_password: '',
    },
  });

  // Separate function to handle async login logic
  const handleLogin = async (data: FormData) => {
    try {
      // Simulate login request; replace this with actual API call in the future
      console.log('Login successful:', data);
      // Redirect after successful login (for example, to the home page)
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
    <>¨
      <Rubrik title = "logga in" />
      <section className="card">
        <form
          // onSubmit={form.handleSubmit()}
          className="login-form">
          <div className="mb-3">
            <label htmlFor="email" className="email">
              E-post
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              // {...form.getInputProps('user_email')}
              required
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
              // {...form.getInputProps('user_password')}
              required
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
