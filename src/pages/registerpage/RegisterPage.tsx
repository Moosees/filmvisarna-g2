import { useState } from 'react';
// import axios from 'axios';
import './RegisterPage.scss';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    user_email: '',
    user_password: '',
    first_name: '',
    last_name: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      // const response = await axios.post('/user/register', formData);
      setSuccess('Användare registrerad.');
    } catch (err) {
      setSuccess('Något gick fel, försök igen!');
    }
  };

  return (
    <>
      <h2>Bli medlem</h2>
      <section className="card">
        <div className="register-form">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                E-post
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="user_email"
                value={formData.user_email}
                onChange={handleInputChange}
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
                name="user_password"
                value={formData.user_password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="repet-password" className="form-label">
                Repitera lösenord
              </label>
              <input
                type="password"
                className="form-control"
                id="repet-password"
                name="user_password"
                value={formData.user_password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                Förnamn
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Efternamn
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Registrera
            </button>
          </form>

          {error && <div className="alert alert-danger mt-3">{error}</div>}
          {success && <div className="alert alert-success mt-3">{success}</div>}
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
