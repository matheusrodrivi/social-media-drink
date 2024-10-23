import React, { useState, useEffect } from "react";
import { auth } from "./firebaseConfig"; 
import DrinkRegister from "./DrinkRegister";
import DrinkList from "./DrinkList";
import Register from "./Register"; 
import AllDrinksList from "./AllDrinkList";
import { Routes, Route } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const App = () => {
  const [codUsuario, setCodUsuario] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setCodUsuario(user.uid);
        setIsRegistered(true);
      } else {
        setCodUsuario(null);
        setIsRegistered(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="div">
      <Header/>
      <h1>Rede social</h1>
      <Routes>
        <Route path="/" element={!isRegistered ? <Register setIsRegistered={setIsRegistered} /> : <DrinkRegister codUsuario={codUsuario} />} />
        <Route path="/register-drink" element={<DrinkRegister codUsuario={codUsuario} />} />
        <Route path="/drink-list" element={<DrinkList codUsuario={codUsuario} />} />
        <Route path="/all-drinks" element={<AllDrinksList />} />
      </Routes>
    </div>
  );
};

export default App;