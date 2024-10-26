import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate para navegação

function EsqueceuSenha() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { resetPassword } = useAuth();
  const navigate = useNavigate(); // Inicializando useNavigate

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await resetPassword(email);
      setMessage("Um e-mail de redefinição de senha foi enviado!");
    } catch (error) {
      setError("Erro ao enviar e-mail de redefinição de senha. Verifique o e-mail digitado.");
      console.error("Erro ao enviar e-mail:", error);
    }
  };

  const handleGoBackToLogin = () => {
    navigate('/login'); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-orange-400 via-pink-300 to-red-500">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Esqueceu sua senha?</h2>
        <p className="mb-4 text-gray-600 text-center">Digite seu e-mail para receber um link de redefinição de senha.</p>
        {message && <div className="mb-4 text-green-600 text-center">{message}</div>}
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        <form onSubmit={handleResetPassword} className="flex flex-col items-center w-full">
          <input
            type="email"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Enviar e-mail de redefinição
          </button>
        </form>
        <button
          onClick={handleGoBackToLogin}
          className="w-full mt-4 px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Voltar para o Login
        </button>
      </div>
    </div>
  );
}

export default EsqueceuSenha;
