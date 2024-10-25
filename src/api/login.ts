const handleLogin: SubmitHandler<FormData> = async (data) => {
  try {
    // Send a POST request to the login endpoint
    const response = await axios.post('/api/user', {
      user_email: data.user_email,
      user_password: data.user_password,
    });

    console.log('Login successful:', response.data);
    // Use sessionStorage
    sessionStorage.setItem('user', JSON.stringify(true));

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
