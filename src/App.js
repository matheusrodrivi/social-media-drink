import React, { useState, useEffect } from "react";
import { auth } from "./firebaseConfig"; 
import DrinkRegister from "./DrinkRegister";
import DrinkList from "./DrinkList";
import AllDrinksList from "./AllDrinkList";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styles from "./index.css";
import Teste from "./components/Teste";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/Login";
import RotaPrivada from "./components/RotaPrivada";
import EsqueceuSenha from "./components/EsqueceuSenha";
import Registrar from "./components/Registrar";

const App = () => {

  return (
        <AuthProvider>
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/registrar" element= {<Registrar />}/>
            <Route path="/login" element= {<Login />}/>
            <Route path="/recuperarSenha" element= {<EsqueceuSenha />}/>


            {/* Rotas Privadas */}
            <Route  element={<RotaPrivada />}>
              <Route path="/" element={<Teste />} />
              
              <Route path="/register-drink" element={<DrinkRegister />} />
              <Route path="/teste" element= {<Teste />}/>
              {/* 
              <Route path="/drink-list" element={<DrinkList codUsuario={codUsuario} />} />
              <Route path="/all-drinks" element={<AllDrinksList />} /> 
              */}
            </Route>
          </Routes>
        </AuthProvider>
  );
};

export default App;