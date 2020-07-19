import React from 'react';

const PokemonId = ({name, url, onSelectPokemon}) => {
        
    return (
                
            <div className="pokemonContainer">  
                
                    <h2 onClick={() => onSelectPokemon(name)}>{name}</h2>
            </div>
    );
}

export default PokemonId;