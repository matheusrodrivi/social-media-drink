import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PublishButton.css';
import { logoutUser } from './authService';


export default function PublishButton() {
  const navigate = useNavigate();

    const handleLogout = async () => {
    try {
      await logoutUser();
      console.log('User logged out successfully');
      // Optionally, redirect the user or update the UI
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleClick = () => {
    navigate('/register-drink');
  };

  return (
    <button className="publish-button" onClick={handleClick}>
      Publicar Drink
    </button>
  );
}