import React, { useState, useEffect } from 'react';
import PokemonModal from '../../Modal/PokemonModal'; // Importa il componente modale
import { useAuth } from '../../contexts/authContext'; // Importa il hook useAuth

const Home = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPokemon, setSelectedPokemon] = useState(null); // Stato per memorizzare il Pokémon selezionato
    const [currentPage, setCurrentPage] = useState(1); // Stato per tenere traccia della pagina corrente
    const [pokemonPerPage] = useState(12); // Numero di Pokémon da visualizzare per pagina

    const { currentUser } = useAuth(); // Ottieni l'oggetto currentUser dal contesto dell'autenticazione

    useEffect(() => {
        async function fetchPokemonList() {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonPerPage * currentPage}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch Pokemon list');
                }
                const data = await response.json();
                setPokemonList(data.results);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }

        fetchPokemonList();

        return () => {
        };
    }, [currentPage]); // Aggiorna la lista di Pokémon quando cambia la pagina corrente

    const handlePokemonClick = (pokemon) => {
        setSelectedPokemon(pokemon); // Imposta il Pokémon selezionato quando viene cliccato
    };

    const handleNextPageClick = () => {
        setCurrentPage(currentPage + 1); // Passa alla pagina successiva
    };

    const handlePrevPageClick = () => {
        setCurrentPage(currentPage - 1); // Torna alla pagina precedente
    };

    const indexOfLastPokemon = currentPage * pokemonPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
    const currentPokemon = pokemonList.slice(indexOfFirstPokemon, indexOfLastPokemon);

    return (
        <div className="container mx-auto pt-8">
            <h1 className="text-4xl font-bold mb-6 text-center">Welcome to the Pokémon World, {currentUser.displayName || 'Trainer'}!</h1> {/* Utilizza currentUser.displayName se disponibile, altrimenti usa 'Trainer' */}

            <div className="grid grid-cols-4 gap-6">
                {loading ? (
                    <div className="col-span-full text-center">Loading...</div>
                ) : (
                    currentPokemon.map((pokemon, index) => (
                        <div key={index} className="flex flex-col items-center cursor-pointer">
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${indexOfFirstPokemon + index + 1}.png`}
                                alt={pokemon.name}
                                className="w-24 h-24 mb-2 rounded-full shadow-md mx-auto cursor-pointer"
                                onClick={() => handlePokemonClick(pokemon)}
                            />
                            <span className="text-lg font-semibold text-center">{pokemon.name}</span>
                        </div>
                    ))
                )}
            </div>

            {/* Pulsanti di navigazione */}
            <div className="flex justify-center mt-6">
                <button
                    onClick={handlePrevPageClick}
                    disabled={currentPage === 1} // Disabilita il pulsante "Previous" sulla prima pagina
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed mr-2"
                >
                    Previous
                </button>
                <button
                    onClick={handleNextPageClick}
                    disabled={currentPokemon.length < pokemonPerPage} // Disabilita il pulsante "Next" se non ci sono abbastanza Pokémon per riempire la pagina
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>

            {/* Modale */}
            <PokemonModal
                open={Boolean(selectedPokemon)} // Apri il modale solo se un Pokémon è stato selezionato
                handleClose={() => setSelectedPokemon(null)} // Chiudi il modale quando viene cliccato fuori
                pokemonDetails={selectedPokemon} // Passa i dettagli del Pokémon selezionato al modale
            />
        </div>
    );
}

export default Home;
