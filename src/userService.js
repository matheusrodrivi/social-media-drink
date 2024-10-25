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

export const addDrinkToUser = async (codUsuario, drink) => {
  const drinkRef = database.ref(`usuarios/${codUsuario}/drinks`).push();
  await drinkRef.set({
    nomeDrink: drink.nomeDrink,
    descricao: drink.descricao,
    tipo: drink.tipo,
    dataAdicao: new Date().toISOString()
  });
};

export const removeDrinkFromUser = async (codUsuario, nomeDrink) => {
  const drinksRef = database.ref(`usuarios/${codUsuario}/drinks`);
  const snapshot = await drinksRef.orderByChild('nomeDrink').equalTo(nomeDrink).once('value');
  const updates = {};
  snapshot.forEach(childSnapshot => {
    updates[childSnapshot.key] = null;
  });
  await drinksRef.update(updates);
};

export const getUserDrinks = async (codUsuario) => {
  const drinksRef = database.ref(`usuarios/${codUsuario}/drinks`);
  const snapshot = await drinksRef.once('value');
  const drinks = [];
  snapshot.forEach(childSnapshot => {
    drinks.push(childSnapshot.val());
  });
  return drinks;
};

export const addUserToDatabase = async (usuario) => {
  try {
    await database.ref('users/' + usuario.codUsuario).set({
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha
    });
    console.log("Usuário adicionado ao Realtime Database com sucesso!");
  } catch (error) {
    console.error("Erro ao adicionar usuário ao Realtime Database:", error);
    throw error;
  }
};