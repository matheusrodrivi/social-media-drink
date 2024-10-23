import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PublishButton.css';

export default function PublishButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/register-drink');
  };

  return (
    <button className="publish-button" onClick={handleClick}>
      Publicar Drink
    </button>
  );
}