import React, { useState } from "react";
import { registerUser } from "../authService";
import { addUserToFirestore } from "../userService";
import Usuario from "../Usuario";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";

const Register = ({ setIsRegistered }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  
  const handleRegister = async () => {
    try {
      const userCredential = await registerUser(email, senha);
      const user = userCredential.user;
      const codUsuario = user.uid;

      const usuario = new Usuario(nome, codUsuario, email, senha);

      await addUserToFirestore(usuario);

      localStorage.setItem("codUsuario", codUsuario);

      setIsRegistered(true);

      navigate("/register-drink");

      alert("Usuário registrado com sucesso!");
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      alert(error.message);
    }
  };

  return (
    <Login />
  );
};

export default Register;