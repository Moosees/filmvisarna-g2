import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const LogOut: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent default anchor behavior

    try {
      await axios.delete('/api/user'); 

      // Clear user data from session storage
      sessionStorage.removeItem('user'); // Use sessionStorage

      navigate('/medlem/logga-in'); // Redirect to the login page
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.'); // Handle error
    }
  };

  return (
    <a href="/medlem/logga-in" onClick={handleLogout} className="logout-link">
      Logga ut
    </a>
  );
};

export default LogOut;