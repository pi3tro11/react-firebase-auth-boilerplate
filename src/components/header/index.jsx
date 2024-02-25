import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';
import { AccountCircle, Search, ShoppingCart, ListAlt } from '@mui/icons-material'; // Importa le icone di Material-UI

const Header = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();
    const [searchQuery, setSearchQuery] = useState(''); // Stato per memorizzare la query di ricerca

    const handleSearchIconClick = () => {
        // Focus sull'input di ricerca quando si fa clic sull'icona di ricerca
        const searchInput = document.getElementById('search-input');
        searchInput.focus();
    };

    const handleSearchInputChange = (e) => {
        // Aggiorna lo stato della query di ricerca quando l'utente modifica l'input di ricerca
        setSearchQuery(e.target.value);
    };

    return (
        <nav className='flex justify-between items-center h-16 bg-gray-900 text-white px-8 shadow-md'>
            <div className="flex items-center"> {/* Sezione del menu a sinistra */}
                <Link to={'/'}><h1 className="text-2xl font-bold">Pokémon World</h1></Link>
            </div>
            <div className="flex items-center flex-grow justify-center"> {/* Sezione di ricerca al centro */}
                <div className="flex items-center bg-gray-800 rounded-md p-1">
                    <input
                        id="search-input"
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        placeholder="Search Pokémon..."
                        className="outline-none bg-transparent text-white mr-2"
                    />
                    <Search onClick={handleSearchIconClick} className="cursor-pointer text-white" />
                </div>
            </div>
            <div className="flex items-center"> {/* Sezione del menu a destra */}
                {userLoggedIn && <Link to={'/orders'} className="mx-4"><ListAlt /></Link>} {/* Icona degli ordini con collegamento alla pagina degli ordini, visibile solo se l'utente è loggato */}
                <Link to={'/cart'} className="mx-4"><ShoppingCart /></Link> {/* Icona del carrello con collegamento alla pagina del carrello */}
                {userLoggedIn ? ( // Se l'utente è loggato
                    <button onClick={() => { // Visualizza il pulsante di logout
                        doSignOut().then(() => { // Esegue il logout e reindirizza alla pagina di login
                            navigate('/login');
                        });
                    }} className="flex items-center">Logout <AccountCircle className="ml-2" /></button>
                ) : ( // Se l'utente non è loggato
                    <>
                        <Link to={'/login'} className="mx-4">Login</Link> {/* Link per accedere */}
                        <Link to={'/register'}>Register</Link> {/* Link per registrarsi */}
                    </>
                )}
            </div>
        </nav>
    );
}

export default Header;
