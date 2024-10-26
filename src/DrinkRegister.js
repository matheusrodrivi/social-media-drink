import React, { useState } from "react";
import { addDrinkToDatabase } from "./userService";
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

      if (!nomeDrink.trim() || !descricao.trim() || !tipo.trim()) {
        alert("Todos os campos devem ser preenchidos.");
        return;
      }

      await addDrinkToDatabase(codUsuario, { nomeDrink, descricao, tipo });

      alert("Drink registrado com sucesso!");
    } catch (error) {
      console.error("Erro ao registrar drink:", error);
      alert("Erro ao registrar drink: " + error.message);
    }
  };

  return (
    <div className="registration-container">
      <h2>Criar publicação</h2>
      <div className="form-group">
        <label htmlFor="drinkName">Nome:</label>
        <input
          type="text"
          id="drinkName"
          name="drinkName"
          value={nomeDrink}
          onChange={(e) => setNomeDrink(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descrição:</label>
        <textarea
          id="description"
          name="description"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="type">Tipo:</label>
        <input
          type="text"
          id="type"
          name="type"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Imagem URL:</label>
        <input
          type="text"
          id="image"
          name="image"
        />
      </div>

      <button onClick={handleRegisterDrink} type="submit" className="submit-button">Register Drink</button>
    </div>
  );
};

export default DrinkRegister;