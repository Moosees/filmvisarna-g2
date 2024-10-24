import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogOut: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async (event: React.MouseEvent) => {
    event.preventDefault();

    try {
      await axios.delete('/api/user');

      // Clear user data from local storage
      localStorage.removeItem('user');


      navigate('/medlem/logga-in'); 
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <a href="/medlem/logga-in" onClick={handleLogout} className="logout-link">
      Logga ut
    </a>
  );
};

export default LogOut;
