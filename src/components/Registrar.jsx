import React from 'react';
import { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { database } from '../firebaseConfig';
import Usuario from '../Usuario';
import { DangerAlert } from './Message';
import { Link, useNavigate } from 'react-router-dom';

function Registrar() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { signup } = useAuth();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(''); 

    const nomeValido = Usuario.validarNome(nameRef.current.value);
    const emailValido = Usuario.validarEmail(emailRef.current.value);
    const senhaValida = Usuario.validarSenha(passwordRef.current.value);

    if (!nomeValido) {
      setError("Nome inválido. Deve ter no máximo 40 caracteres e não pode estar vazio.");
      return;
    }

    if (!emailValido) {
      setError("Email inválido. Por favor, insira um email válido.");
      return;
    }

    if (!senhaValida) {
      setError("Senha inválida. A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setError("As senhas não coincidem.");
      return;
    }

    setError('');
    try {
      const userCredential = await signup(emailRef.current.value, passwordRef.current.value);
      const user = userCredential.user;
      const uid = user.uid;

      // salva os dados do usuário no database usando o UID como chave
      await database.ref(`usuarios/${uid}`).set({
        nome: nameRef.current.value,
        email: emailRef.current.value,
        dataRegistro: new Date().toISOString(),
      });
      console.log('Usuário cadastrado com sucesso!');
      navigate("/");
    } catch (error) {
      // Captura erros específicos e define uma mensagem mais amigável
      switch (error.code) {
        case 'auth/weak-password':
          setError("Senha fraca. A senha deve ter pelo menos 6 caracteres.");
          break;
        case 'auth/email-already-in-use':
          setError("Esse email já está em uso. Tente usar um email diferente.");
          break;
        default:
          setError("Erro ao cadastrar o usuário. Tente novamente.");
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-400 via-pink-300 to-red-500 flex items-center justify-center">
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg flex flex-col items-center justify-center p-6 sm:px-8 lg:px-10 w-full max-w-md">
        <h1 className="mb-4 text-2xl font-bold dark:text-white text-center">Criar uma nova conta</h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          {error && <DangerAlert message={error} />}
          
          <div>
            <label className="text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="name">Nome:</label>
            <input
              className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2 text-sm rounded-lg"
              id="name" type="text" name="name" placeholder="Seu nome de usuário" ref={nameRef} required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="email">Email:</label>
            <input
              className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2 text-sm rounded-lg"
              id="email" type="email" name="email" placeholder="email@exemplo.com" ref={emailRef} required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="password">Senha:</label>
            <input
              className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2 text-sm rounded-lg"
              id="password" type="password" ref={passwordRef} required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="confirmPassword">Confirmar Senha:</label>
            <input
              className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2 text-sm rounded-lg"
              id="confirmPassword" type="password" ref={confirmPasswordRef} required
            />
          </div>

          <button 
            type="submit" 
            disabled={isButtonDisabled} 
            className="border transition-colors focus:ring-2 p-2 disabled:cursor-not-allowed border-transparent bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white disabled:bg-gray-300 disabled:text-gray-700 rounded-lg"
          >
            Cadastrar-se
          </button>
        </form>

        <div className="mt-4 text-center dark:text-gray-200 w-full">
          Já tem uma conta?
          <span className="text-blue-500 hover:text-blue-600">
            <Link to="/login"> Clique aqui</Link>
          </span>
        </div>
      </div>
    </div>
  );

}

export default Registrar;
