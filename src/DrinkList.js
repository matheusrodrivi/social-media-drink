import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import Footer from './Footer';

const DrinkList = ({ codUsuario }) => {
  const [drinks, setDrinks] = useState([]);
  const [usuarioNome, setUsuarioNome] = useState('');
  const db = getFirestore();

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const drinksRef = collection(db, 'usuarios', codUsuario, 'drinks');
        const drinksSnapshot = await getDocs(drinksRef);

        const drinksList = drinksSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setDrinks(drinksList);

        const usuarioRef = doc(db, 'usuarios', codUsuario);
        const usuarioDoc = await getDoc(usuarioRef);
        if (usuarioDoc.exists()) {
          setUsuarioNome(usuarioDoc.data().nome);
        } else {
          console.log("Usuário não encontrado!");
        }

      } catch (error) {
        console.error("Erro ao buscar drinks:", error);
      }
    };

    fetchDrinks();
  }, [codUsuario, db]);

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
