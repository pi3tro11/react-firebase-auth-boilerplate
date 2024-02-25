import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, LinearProgress } from '@mui/material'; // Importa LinearProgress da Material-UI

const PokemonModal = ({ open, handleClose, pokemonDetails }) => {
    const [pokemonInfo, setPokemonInfo] = useState(null);
    const [loading, setLoading] = useState(false); // Aggiungi uno stato per il caricamento

    useEffect(() => {
        async function fetchPokemonInfo() {
            try {
                setLoading(true); // Imposta lo stato di caricamento su true durante il recupero delle informazioni
                const response = await fetch(pokemonDetails.url);
                if (!response.ok) {
                    throw new Error('Failed to fetch Pokemon info');
                }
                const data = await response.json();
                setPokemonInfo(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false); // Imposta lo stato di caricamento su false quando il recupero delle informazioni è completato
            }
        }

        fetchPokemonInfo();

        return () => {
        };
    }, [pokemonDetails]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{pokemonDetails ? pokemonDetails.name : 'Loading...'}</DialogTitle>
            <DialogContent>
                {loading ? ( // Visualizza la barra di caricamento se loading è true
                    <LinearProgress /> // Barra di caricamento lineare di Material-UI
                ) : pokemonInfo ? ( // Se le informazioni complete del Pokémon sono disponibili
                    <div>
                        <img src={pokemonInfo.sprites.front_default} alt={pokemonDetails ? pokemonDetails.name : ''} /> {/* Immagine del Pokémon */}
                        <div>Height: {pokemonInfo.height}</div>
                        <div>Weight: {pokemonInfo.weight}</div>
                    </div>
                ) : (
                    <div>Loading...</div> // Visualizza un messaggio di caricamento finché non vengono recuperate le informazioni complete del Pokémon
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default PokemonModal;
