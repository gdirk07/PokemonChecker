import React from "react";

type PokemonIdProps = {
  name: string;
  url: string;
  onSelectPokemon: (name: string, url: string) => {};
};

const PokemonId = ({ name, url, onSelectPokemon }: PokemonIdProps) => {
  return (
    <div className="pokemonContainer">
      <h2 onClick={() => onSelectPokemon(name, url)}>{name}</h2>
    </div>
  );
};

export default PokemonId;
