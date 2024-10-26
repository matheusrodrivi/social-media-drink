import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function RotaPrivada() {
  const { currentUser } = useAuth();

  if (currentUser === undefined) {
    // Carregando a verificação de autenticação
    return <div>Loading...</div>;
  }

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}

export default RotaPrivada;
