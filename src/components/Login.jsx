import React, { useState, useRef } from 'react';
import { DangerAlert } from './Message';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, loginWithGoogle } = useAuth();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado de loading
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); // Ativa o loading
    try {
      setError('');
      setIsButtonDisabled(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Email e/ou senha incorreto(s)");
    } finally {
      setLoading(false); // Desativa o loading
      setIsButtonDisabled(false);
    }
  }

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true); // Ativa o loading
    try {
      await loginWithGoogle();
      navigate('/'); // Redireciona para a página inicial ou dashboard após o login
    } catch {
      setError('Falha ao fazer login com Google. Tente novamente.');
    } finally {
      setLoading(false); // Desativa o loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-400 via-pink-300 to-red-500">
      {loading && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-green-500 transition-all duration-300 ease-in-out" />
      )}
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-md flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        {error && <DangerAlert message={error} />}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              ref={emailRef}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="email@exemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Senha:</label>
            <input
              type="password"
              ref={passwordRef}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Sua senha"
            />
            <p className="mt-2 text-sm text-blue-600 hover:underline">
              <Link to="/recuperarSenha">Esqueceu a senha?</Link>
            </p>
          </div>

          <button
            type="submit"
            disabled={isButtonDisabled}
            className="w-full py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
          >
            Entrar
          </button>

          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full py-2 mt-2 bg-white text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 48 48"
            >
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
            Entrar com o Google
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-gray-600">Precisa de uma conta? </span>
          <Link to="/registrar" className="text-blue-600 hover:underline">Clique aqui</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
