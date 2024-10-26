// import { firestore } from "./firebaseConfig";
// import Usuario from "./Usuario";

// // export const addUserToFirestore = (usuario) => {
// //   const userRef = firestore.collection("usuarios").doc(usuario.getCodUsuario());
// //   return userRef.set({
// //     nome: usuario.getNome(),
// //     email: usuario.getEmail(),
// //     codUsuario: usuario.getCodUsuario()
// //   });
// // };


// export const addUserToFirestore = async (usuario) => {
//     const userRef = firestore.collection("usuarios").doc(usuario.getCodUsuario());
//     await userRef.set({
//       nome: usuario.getNome(),
//       email: usuario.getEmail(),
//       codUsuario: usuario.getCodUsuario()
//     });
// };

// export const getUserFromFirestore = async (codUsuario) => {
//   const userRef = firestore.collection("usuarios").doc(codUsuario);
//   const doc = await userRef.get();
//   if (doc.exists) {
//     return doc.data();
//   } else {
//     throw new Error("Usuário não encontrado");
//   }
// };

// export const addDrinkToUser = async (codUsuario, drink) => {
//     const drinkRef = firestore.collection("usuarios")
//                               .doc(codUsuario)
//                               .collection("drinks")
//                               .doc(drink.nomeDrink); // ou use `.add()` para ID automático
//     await drinkRef.set({
//       nomeDrink: drink.nomeDrink,
//       descricao: drink.descricao,
//       tipo: drink.tipo,
//       dataAdicao: new Date()
//     });
// };

// export const removeDrinkFromUser = async (codUsuario, nomeDrink) => {
//     const drinkRef = firestore.collection("usuarios")
//                               .doc(codUsuario)
//                               .collection("drinks")
//                               .doc(nomeDrink);
//     await drinkRef.delete();
// };

// export const getUserDrinks = async (codUsuario) => {
//     const drinksRef = firestore.collection("usuarios").doc(codUsuario).collection("drinks");
//     const snapshot = await drinksRef.get();
//     const drinks = [];
//     snapshot.forEach(doc => {
//       drinks.push(doc.data());
//     });
//     return drinks;
// };
  
