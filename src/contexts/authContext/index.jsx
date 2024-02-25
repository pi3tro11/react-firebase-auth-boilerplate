import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase"; // Importa l'istanza di autenticazione da Firebase
import { onAuthStateChanged } from "firebase/auth"; // Importa la funzione onAuthStateChanged per gestire il cambio di stato dell'autenticazione

const AuthContext = React.createContext(); // Crea il contesto di autenticazione

export function useAuth() { // Custom hook per utilizzare il contesto di autenticazione
  return useContext(AuthContext);
}

export function AuthProvider({ children }) { // Componente provider di autenticazione
  const [currentUser, setCurrentUser] = useState(null); // Stato per memorizzare l'utente corrente
  const [userLoggedIn, setUserLoggedIn] = useState(false); // Stato per memorizzare se l'utente è loggato
  const [isEmailUser, setIsEmailUser] = useState(false); // Stato per memorizzare se l'utente ha effettuato l'accesso tramite email e password
  const [isGoogleUser, setIsGoogleUser] = useState(false); // Stato per memorizzare se l'utente ha effettuato l'accesso tramite Google
  const [loading, setLoading] = useState(true); // Stato per memorizzare se l'applicazione sta ancora caricando

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser); // Aggiunge un listener per gestire il cambio di stato dell'autenticazione
    return unsubscribe; // Pulizia dell'effetto, cancella il listener quando il componente viene smontato
  }, []);

  async function initializeUser(user) {
    if (user) { // Se l'utente è autenticato
      setCurrentUser({ ...user }); // Imposta l'utente corrente
      const isEmail = user.providerData.some( // Controlla se l'autenticazione è stata fatta tramite email e password
        (provider) => provider.providerId === "password"
      );
      setIsEmailUser(isEmail); // Imposta lo stato di accesso tramite email e password
      setUserLoggedIn(true); // Imposta lo stato di accesso dell'utente a true
    } else { // Se l'utente non è autenticato
      setCurrentUser(null); // Imposta l'utente corrente a null
      setUserLoggedIn(false); // Imposta lo stato di accesso dell'utente a false
    }
    setLoading(false); // Imposta lo stato di caricamento a false una volta completato il processo di inizializzazione dell'utente
  }

  const value = { // Oggetto contenente i valori del contesto
    userLoggedIn,
    isEmailUser,
    isGoogleUser,
    currentUser,
    setCurrentUser
  };

  return (
      // Mostra i componenti figli solo dopo il caricamento dell'utente
    <AuthContext.Provider value={value}> 
      {!loading && children} 
    </AuthContext.Provider>
  );
}
