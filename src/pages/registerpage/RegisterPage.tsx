import { useState } from 'react';
// import axios from 'axios';

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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 text-center mb-4">
          <h2 className="register-title">Bli medlem</h2>
        </div>
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="field-container">
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
                    autoComplete="email"
                  />
                </div>

                <div className="field-container">
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
                    autoComplete="new-password"
                  />
                </div>

                <div className="field-container">
                  <label htmlFor="password-repet" className="form-label">
                    Repetera lösenord
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password-repet"
                    name="user_password"
                    value={formData.user_password}
                    onChange={handleInputChange}
                    required
                    autoComplete="new-password"
                  />
                </div>

                <div className="field-container">
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

                <div className="field-container">
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

                <div className="button-group">
                  <button type="submit" className="btn btn-custom btn-lg">
                    Avbryt
                  </button>
                  <button
                    type="submit"
                    className="btn btn-custom-secondary btn-lg"
                  >
                    Bli medlem
                  </button>
                </div>
              </form>

              {error && <div className="alert alert-danger mt-3">{error}</div>}
              {success && (
                <div className="alert alert-success mt-3">{success}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
