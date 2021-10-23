import React from "react";
import PokemonId from "./PokemonId";
import "./PokemonSearch.css";

interface PokemonSearchObj {
  name: string;
  url: string;
}

type PokemonSearchResultsProps = {
  pokemonQuery: PokemonSearchObj[],
  onPokemonSelected: () => {}
}

const PokemonSearchResults = ({pokemonQuery, onPokemonSelected}: PokemonSearchResultsProps) => {
  let pokemonComponent: JSX.Element[] = [];
  if (pokemonQuery) {
    pokemonComponent = pokemonQuery.map((pokemon, p) =>
      <PokemonId key={p} name={pokemon.name} url={pokemon.url} onSelectPokemon={onPokemonSelected}></PokemonId>
    )
  }
  if (pokemonComponent.length === 0) {
    return (
      <div>
          <h4>No pokemon found</h4>
      </div>
    )
  }
  else {
    return (
      <div className="pokemonList">
        {pokemonComponent}
      </div>
    );
  }
}
export default PokemonSearchResults;
