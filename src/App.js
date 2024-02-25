import Login from "./components/auth/login"; // Importa il componente per il login
import Register from "./components/auth/register"; // Importa il componente per la registrazione

import Header from "./components/header"; // Importa il componente dell'intestazione
import Home from "./components/home"; // Importa il componente per la home

import { AuthProvider } from "./contexts/authContext"; // Importa il provider di autenticazione
import { useRoutes } from "react-router-dom"; // Importa la funzione useRoutes per gestire le rotte

function App() {
  // Definizione delle rotte dell'applicazione
  const routesArray = [
    {
      path: "*", // Rotta predefinita
      element: <Login />, // Mostra il componente di login
    },
    {
      path: "/login", // Rotta per il login
      element: <Login />, // Mostra il componente di login
    },
    {
      path: "/register", // Rotta per la registrazione
      element: <Register />, // Mostra il componente di registrazione
    },
    {
      path: "/home", // Rotta per la home
      element: <Home />, // Mostra il componente per la home
    },
  ];

  let routesElement = useRoutes(routesArray); // Utilizza la funzione useRoutes per gestire le rotte definite sopra

  return (
    <AuthProvider> {/* Fornisce il contesto di autenticazione ai componenti figli */}
      <Header /> {/* Mostra l'intestazione dell'applicazione */}
      <div className="w-full h-screen flex flex-col">{routesElement}</div> {/* Mostra i componenti delle rotte */}
    </AuthProvider>
  );
}

export default App;
