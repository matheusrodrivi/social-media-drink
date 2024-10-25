import React, { useEffect, useState } from 'react';
import { database } from './firebaseConfig';
import Footer from './Footer';

const DrinkList = ({ codUsuario }) => {
  const [drinks, setDrinks] = useState([]);
  const [usuarioNome, setUsuarioNome] = useState('');

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const drinksRef = database.ref(`usuarios/${codUsuario}/drinks`);
        const drinksSnapshot = await drinksRef.once('value');

        const drinksList = [];
        drinksSnapshot.forEach(drinkSnapshot => {
          drinksList.push({
            id: drinkSnapshot.key,
            ...drinkSnapshot.val()
          });
        });

        setDrinks(drinksList);

        const usuarioRef = database.ref(`usuarios/${codUsuario}`);
        const usuarioSnapshot = await usuarioRef.once('value');
        if (usuarioSnapshot.exists()) {
          setUsuarioNome(usuarioSnapshot.val().nome);
        } else {
          console.log("Usuário não encontrado!");
        }

      } catch (error) {
        console.error("Erro ao buscar drinks:", error);
      }
    };

    fetchDrinks();
  }, [codUsuario]);

  return (
    <div>
      <div>
        <h2>Drinks Cadastrados</h2>
        {drinks.length === 0 ? (
          <p>Nenhum drink cadastrado.</p>
        ) : (
          <ul>
            {drinks.map(drink => (
              <li key={drink.id}>
                <h3>{drink.nomeDrink}</h3>
                <p><strong>Descrição:</strong> {drink.descricao}</p>
                <p><strong>Tipo:</strong> {drink.tipo}</p>
                <p><strong>Cadastrado por:</strong> {usuarioNome}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DrinkList;