import React, { useState } from "react";
import { firestore } from "./firebaseConfig";
import './DrinkRegister.css'

const DrinkRegister = () => {
  const [nomeDrink, setNomeDrink] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");
  const codUsuario = localStorage.getItem("codUsuario"); 

  const handleRegisterDrink = async () => {
    try {
      await firestore.collection("usuarios").doc(codUsuario).collection("drinks").add({
        nomeDrink,
        descricao,
        tipo,
        nomeUsuario: codUsuario,
      });
      alert("Drink registrado com sucesso!");
    } catch (error) {
      console.error("Erro ao registrar drink:", error);
    }
  };

  return (
    // <div>
    //   <input type="text" value={nomeDrink} onChange={(e) => setNomeDrink(e.target.value)} placeholder="Nome do Drink" />
    //   <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" />
    //   <input type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} placeholder="Tipo" />
    //   <button onClick={handleRegisterDrink}>Registrar Drink</button>
    // </div>
    <div className="card">
    <div className="card-header">
      <h2 className="card-title">Criar Nova Publicação</h2>
    </div>
    <form >
      <div className="card-content">
        <div className="form-group">
          <label htmlFor="titulo">Nome do drink</label>
          <input
            id="titulo"
            type="text"
            placeholder="Digite o nome do drink"
            value={nomeDrink}
            onChange={(e) => setNomeDrink(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="conteudo">Descrição</label>
          <textarea
            id="conteudo"
            placeholder="Digite a descrição do drink"
            value ={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows={3}
          />
        </div>
        <div className="form-group">
          <label htmlFor="titulo">Tipo</label>
          <input
            id="titulo"
            type="text"
            placeholder="Digite o tipo do drink"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="imagem">Adicionar Imagem</label>
          <div className="image-upload">
            <input
              id="imagem"
              type="file"
              accept="image/*"
              // onChange={handleImagemChange}
              className="hidden-input" */}
            
            {/* <label htmlFor="imagem" className="image-upload-label">
              {imagem ? (
                <div className="image-preview">
                  <img
                    src={URL.createObjectURL(imagem)}
                    alt="Preview"
                    className="preview-image"
                  />
                  <button
                    type="button"
                    className="remove-image"
                    onClick={() => setImagem(null)}
                  >
                    X
                  </button>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <span className="upload-icon">+</span>
                  <span>Adicionar Imagem</span>
                </div>
              )}
            </label> */}
          {/* </div> */}
        {/* </div> */}
      </div>
      <div className="card-footer">
        <button type="button" className="btn btn-outline">
          Cancelar
        </button>
        <button onClick={handleRegisterDrink} className="btn btn-primary">
          Publicar
        </button>
      </div>
    </form>
  </div>
  );
};

export default DrinkRegister;