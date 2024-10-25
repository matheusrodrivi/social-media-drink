import React, { useEffect, useState } from "react";
import { database } from "./firebaseConfig";
import './AllDrinkList.css';
import PublishButton from "./PublishButton";
import SearchBar from "./SearchBar";

const AllDrinksList = () => {
  const [drinks, setDrinks] = useState([]);
  const [filteredDrinks, setFilteredDrinks] = useState([]);

  useEffect(() => {
    const fetchAllDrinks = async () => {
      try {
        const usersRef = database.ref('usuarios');
        const usersSnapshot = await usersRef.once('value');
        const allDrinks = [];

        const drinkPromises = [];

        usersSnapshot.forEach(userSnapshot => {
          const userId = userSnapshot.key;
          const userName = userSnapshot.val().nome;
          const drinksRef = database.ref(`usuarios/${userId}/drinks`);
          const drinkPromise = drinksRef.once('value').then(drinksSnapshot => {
            drinksSnapshot.forEach(drinkSnapshot => {
              allDrinks.push({
                id: drinkSnapshot.key,
                ...drinkSnapshot.val(),
                nomeUsuario: userName
              });
            });
          });
          drinkPromises.push(drinkPromise);
        });

        await Promise.all(drinkPromises);

        setDrinks(allDrinks);
        setFilteredDrinks(allDrinks);
      } catch (error) {
        console.error("Erro ao buscar drinks:", error);
      }
    };

    fetchAllDrinks();
  }, []);

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
      <div className="div-container">
        <PublishButton/>
      </div>
      {filteredDrinks.length === 0 ? (
        <p>Nenhum drink cadastrado.</p>
      ) : (
        <ul>
          {filteredDrinks.map(drink => (
            <div key={drink.id} className="social-media-card">
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