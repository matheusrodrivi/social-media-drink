import React, { useState } from "react";
import { database } from "./firebaseConfig";  // Altere para usar o Realtime Database

const DrinkRegister = () => {
  const [nomeDrink, setNomeDrink] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");
  const codUsuario = localStorage.getItem("codUsuario"); // Pegando o ID do usuário salvo no localStorage

  const handleRegisterDrink = async () => {
    try {
      if (!codUsuario) {
        alert("Usuário não encontrado. Faça login novamente.");
        return;
      }

      // Salvando os dados no Realtime Database
      await database.ref(`usuarios/${codUsuario}/drinks`).push({
        nomeDrink,
        descricao,
        tipo,
      });

      alert("Drink registrado com sucesso!");
      setNomeDrink("");  // Limpar o campo após o registro
      setDescricao("");
      setTipo("");
    } catch (error) {
      console.error("Erro ao registrar drink:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={nomeDrink}
        onChange={(e) => setNomeDrink(e.target.value)}
        placeholder="Nome do Drink"
      />
      <input
        type="text"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        placeholder="Descrição"
      />
      <input
        type="text"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
        placeholder="Tipo"
      />
      <button onClick={handleRegisterDrink}>Registrar Drink</button>
    </div>
  );
};

export default DrinkRegister;
