import React, { useState } from "react";
import { database } from "./firebaseConfig";
import './DrinkRegister.css';

const DrinkRegister = () => {
  const [nomeDrink, setNomeDrink] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");
  const codUsuario = localStorage.getItem("codUsuario");

  const handleRegisterDrink = async () => {
    try {
      if (!codUsuario) {
        throw new Error("Usuário não está logado.");
      }

      console.log("Registering drink with the following details:", {
        nomeDrink,
        descricao,
        tipo,
        codUsuario
      });

      await database.ref(`usuarios/${codUsuario}/drinks`).push({
        nomeDrink,
        descricao,
        tipo,
        nomeUsuario: codUsuario,
      });

      alert("Drink registrado com sucesso!");
    } catch (error) {
      console.error("Erro ao registrar drink:", error);
      alert("Erro ao registrar drink: " + error.message);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Criar Nova Publicação</h2>
      </div>
      <div className="card-body">
        <input
          type="text"
          id="nomeDrink"
          value={nomeDrink}
          onChange={(e) => setNomeDrink(e.target.value)}
          placeholder="Nome do Drink"
        />
        <input
          type="text"
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição"
        />
        <input
          type="text"
          id="tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          placeholder="Tipo"
        />
        <button onClick={handleRegisterDrink}>Registrar Drink</button>
      </div>
    </div>
  );
};

export default DrinkRegister;