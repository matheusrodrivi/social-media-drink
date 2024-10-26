import React, { useState, useEffect } from "react";
import { database } from "./firebaseConfig"; // Import the database reference
import SearchBar from "./SearchBar";
import PublishButton from "./PublishButton";
import './AllDrinkList.css';

const AllDrinksList = () => {
  const [drinks, setDrinks] = useState([]);
  const [filteredDrinks, setFilteredDrinks] = useState([]);

  useEffect(() => {
    const fetchAllDrinks = async () => {
      try {
        const allDrinksSnapshot = await database.ref('drinks').once('value');
        const allDrinks = [];
        allDrinksSnapshot.forEach(drinkSnapshot => {
          const drink = drinkSnapshot.val();
          allDrinks.push({ id: drinkSnapshot.key, ...drink });
        });

        const drinksWithUserDetails = await Promise.all(allDrinks.map(async (drink) => {
          const userSnapshot = await database.ref(`usuarios/${drink.codUsuario}`).once('value');
          const user = userSnapshot.val();
          return { ...drink, nomeUsuario: user.nome };
        }));

        setDrinks(drinksWithUserDetails);
        setFilteredDrinks(drinksWithUserDetails);
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
    <div className="divAllDrinkList">
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