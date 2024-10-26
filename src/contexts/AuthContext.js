import React, { useContext, useState, useEffect } from "react";
import { auth, database } from "../firebaseConfig";
import firebase from 'firebase/compat/app';


const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loginWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await auth.signInWithPopup(provider);
      const user = result.user;

      // salva no real time database
      await database.ref(`usuarios/${user.uid}`).set({
        nome: user.displayName,
        email: user.email,
        dataRegistro: new Date().toISOString(),
      });

      return user;
    } catch (error) {
      console.error("Erro ao fazer login com Google:", error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };
  
  const resetPassword = (email) => auth.sendPasswordResetEmail(email);
  

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    loginWithGoogle
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Renderiza as rotas apenas quando o estado de carregamento for falso */}
    </AuthContext.Provider>
  );
}
