import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import './AllDrinkList.css';
import PublishButton from "./PublishButton";
import SearchBar from "./SearchBar";

const AllDrinksList = () => {
  const [drinks, setDrinks] = useState([]);
  const [filteredDrinks, setFilteredDrinks] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchAllDrinks = async () => {
      try {
        const usersRef = collection(db, 'usuarios');
        const usersSnapshot = await getDocs(usersRef);
        const allDrinks = [];

        for (const userDoc of usersSnapshot.docs) {
          const drinksRef = collection(db, 'usuarios', userDoc.id, 'drinks');
          const drinksSnapshot = await getDocs(drinksRef);

          drinksSnapshot.docs.forEach(drinkDoc => {
            allDrinks.push({
              id: drinkDoc.id,
              ...drinkDoc.data(),
              nomeUsuario: userDoc.data().nome
            });
          });
        }

        setDrinks(allDrinks);
        setFilteredDrinks(allDrinks);
      } catch (error) {
        console.error("Erro ao buscar drinks:", error);
      }
    };

    fetchAllDrinks();
  }, [db]);

  const handleSearch = (query) => {
    if (query.trim() === "") {
      setFilteredDrinks(drinks);
    } else {
      const filtered = drinks.filter(drink => 
        drink.nomeDrink.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredDrinks(filtered);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch}/>
      <div class="div-container">
      <PublishButton/>
      </div>
      {filteredDrinks.length === 0 ? (
        <p>Nenhum drink cadastrado.</p>
      ) : (
        <ul>
          {filteredDrinks.map(drink => (
            <div className="social-media-card">
            <div className="card-header">
              <h2 className="user-name">{drink.nomeUsuario}</h2>
            </div>
            <h3 className="post-title">{drink.nomeDrink}</h3>
            <span className="post-type">{drink.tipo}</span>
            <p className="post-description">{drink.descricao}</p>
          </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllDrinksList;
