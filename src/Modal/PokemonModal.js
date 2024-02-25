import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, LinearProgress, TextField, IconButton } from '@mui/material'; // Importa LinearProgress e altri componenti da Material-UI
import FavoriteIcon from '@mui/icons-material/Favorite'; // Importa l'icona del cuore per i preferiti

const PokemonModal = ({ open, handleClose, pokemonDetails, handleBuy, handleFavorite }) => {
    const [pokemonInfo, setPokemonInfo] = useState(null);
    const [loading, setLoading] = useState(false); // Aggiungi uno stato per il caricamento
    const [quantity, setQuantity] = useState(1); // Stato per memorizzare la quantità selezionata
    const [isFavorite, setIsFavorite] = useState(false); // Stato per indicare se il Pokémon è nei preferiti

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

    useEffect(() => {
        // Controlla se il Pokémon corrente è nei preferiti
        // Esempio: confronta pokemonDetails.name con i Pokémon presenti nei preferiti
        // Se è nei preferiti, imposta isFavorite su true
        setIsFavorite(false); // Questa è una logica fittizia, sostituiscila con la tua logica effettiva
    }, [pokemonDetails]);

    const handleBuyClick = () => {
        if (handleBuy) {
            handleBuy(pokemonInfo, quantity); // Chiama la funzione handleBuy e passa le informazioni complete del Pokémon e la quantità selezionata
        }
    };

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite); // Cambia lo stato di isFavorite quando l'utente fa clic sull'icona dei preferiti
        if (handleFavorite) {
            handleFavorite(pokemonInfo, !isFavorite); // Passa le informazioni complete del Pokémon e lo stato aggiornato dei preferiti alla funzione handleFavorite
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{pokemonDetails ? pokemonDetails.name : 'Loading...'}</span>
                    <IconButton onClick={handleClose} color="error">
                        ×
                    </IconButton> {/* Pulsante "X" per chiudere il modal */}
                </div>
            </DialogTitle>
            <DialogContent>
                {loading ? ( // Visualizza la barra di caricamento se loading è true
                    <LinearProgress /> // Barra di caricamento lineare di Material-UI
                ) : pokemonInfo ? ( // Se le informazioni complete del Pokémon sono disponibili
                    <div>
                        <img src={pokemonInfo.sprites.front_default} alt={pokemonDetails ? pokemonDetails.name : ''} /> {/* Immagine del Pokémon */}
                        <div>Height: {pokemonInfo.height}</div>
                        <div>Weight: {pokemonInfo.weight}</div>
                        <TextField
                            label="Quantity"
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            InputProps={{ inputProps: { min: 1 } }}
                            fullWidth
                        />
                    </div>
                ) : (
                    <div>Loading...</div> // Visualizza un messaggio di caricamento finché non vengono recuperate le informazioni complete del Pokémon
                )}
            </DialogContent>
            <DialogActions>
                <IconButton onClick={handleFavoriteClick} color={isFavorite ? 'primary' : 'default'}>
                    <FavoriteIcon />
                </IconButton>
                <Button onClick={handleBuyClick} variant="contained" color="primary">
                Buy
            </Button>
            <Button onClick={handleClose} variant="contained" color="error">
                Cancel
            </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PokemonModal;
