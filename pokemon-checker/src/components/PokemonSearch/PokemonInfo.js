import React, {Component} from "react";
import PokemonId from './PokemonId';
import "./PokemonSearch.css";

const PokemonInfo = ({pokemonQuery, onPokemonSelected}) => {

    const pokemonComponent = pokemonQuery.map((pokemon, p) =>
        <PokemonId key={p} name={pokemon.name} url={pokemon.url} onSelectPokemon={onPokemonSelected}></PokemonId>
    )
    if (pokemonComponent.length === 0) {
        return (
            <div>
                <h4>No pokemon found</h4>
            </div>
        )
    }
    else {
        return (
            <div className="pokemonList" onClick={onPokemonSelected}>
                    {pokemonComponent}

            </div>
        );
    }

    
}




    
export default PokemonInfo;