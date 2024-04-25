import React from 'react';
import axios from 'axios';
import'./logout.css'

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      // Retrieve refresh token from local storage
      console.log(localStorage);
      const refreshToken = localStorage.getItem('token');

      // Check if refresh token exists
      if (!refreshToken) {
        throw new Error('Refresh token not found.');
      }

      // Send logout request with refresh token
      await axios.post('http://localhost:8000/account/api/logout/', { refresh_token: refreshToken });

      // Clear authentication tokens from local storage
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');

      // Redirect to login page
      window.location.href = '/login';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <button className='logout-button' onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
