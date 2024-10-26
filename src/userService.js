import { database } from "./firebaseConfig"; // Ensure this points to your Firebase configuration file

export const getUserFromDatabase = async (codUsuario) => {
  const userRef = database.ref(`usuarios/${codUsuario}`);
  const snapshot = await userRef.once('value');
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    throw new Error("Usuário não encontrado");
  }
};

export const addDrinkToDatabase = async (codUsuario, drink) => {
  const drinkRef = database.ref('drinks').push();
  await drinkRef.set({
    codUsuario,
    nomeDrink: drink.nomeDrink,
    descricao: drink.descricao,
    tipo: drink.tipo,
    dataAdicao: new Date().toISOString()
  });
};

export const removeDrinkFromDatabase = async (codUsuario, nomeDrink) => {
  const drinksRef = database.ref('drinks');
  const snapshot = await drinksRef.orderByChild('nomeDrink').equalTo(nomeDrink).once('value');
  const updates = {};
  snapshot.forEach(childSnapshot => {
    if (childSnapshot.val().codUsuario === codUsuario) {
      updates[childSnapshot.key] = null;
    }
  });
  await drinksRef.update(updates);
};

export const getUserDrinks = async (codUsuario) => {
  const drinksRef = database.ref('drinks');
  const snapshot = await drinksRef.orderByChild('codUsuario').equalTo(codUsuario).once('value');
  const drinks = [];
  snapshot.forEach(childSnapshot => {
    drinks.push(childSnapshot.val());
  });
  return drinks;
};

export const addUserToDatabase = async (usuario) => {
  try {
    await database.ref('usuarios/' + usuario.codUsuario).set({
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha
    });
  } catch (error) {
    throw new Error("Erro ao adicionar usuário: " + error.message);
  }
};