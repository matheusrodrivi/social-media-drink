import React, { useState, useEffect } from "react";
import { database } from "./firebaseConfig"; // Import the database reference
// import './DrinkList.css';
import UserProfile from './components/UserProfile/UserProfile';


const DrinkList = () => {
  const [drinks, setDrinks] = useState([]);
  const codUsuario = localStorage.getItem("codUsuario"); // Retrieve the logged-in user's codUsuario
  const [usuarioNome, setUsuarioNome] = useState("");

  useEffect(() => {
    const fetchUserDrinks = async () => {
      try {
        const userSnapshot = await database.ref(`usuarios/${codUsuario}`).once('value');
        const user = userSnapshot.val();
        setUsuarioNome(user.nome);

        const drinksSnapshot = await database.ref('drinks').orderByChild('codUsuario').equalTo(codUsuario).once('value');
        const userDrinks = [];
        drinksSnapshot.forEach(drinkSnapshot => {
          const drink = drinkSnapshot.val();
          userDrinks.push({ id: drinkSnapshot.key, ...drink });
        });

        const drinksWithUserDetails = userDrinks.map(drink => ({
          ...drink,
          nomeUsuario: user.nome
        }));

        setDrinks(drinksWithUserDetails);
      } catch (error) {
        console.error("Erro ao buscar drinks:", error);
      }
    };

    fetchUserDrinks();
  }, [codUsuario]);

  return (
    <div>
      <UserProfile userName={usuarioNome} />
      {drinks.length === 0 ? (
        <p>Nenhum drink cadastrado.</p>
      ) : (
        <ul>
          {drinks.map(drink => (
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

export default DrinkList;