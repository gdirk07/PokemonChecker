import React, { useState } from "react";
import PokemonId from "./PokemonId";
import PokemonDTO from "../../DataTransferObjects/PokemonDTO"
import Box from "@mui/system/box";

export type PokemonSearchResultsProps = {
  pokemonQuery: PokemonDTO[];
  onPokemonSelected: (url: string) => void;
};

export default function PokemonSearchResults({
  onPokemonSelected,
  pokemonQuery,
}: PokemonSearchResultsProps) {
  const [selectedPokemon, setSelectedPokemon] = useState("");

  let pokemonComponent: JSX.Element[] = [];
  if (pokemonQuery && pokemonQuery.length > 0) {
    pokemonComponent = pokemonQuery.map((pokemon, p) => (
      <PokemonId
        key={p}
        name={pokemon.name}
        url={pokemon.url}
        onSelectPokemon={onPokemonSelected}
        onPokemonClicked={setSelectedPokemon}
        active={selectedPokemon}
      ></PokemonId>
    ));
  }
  if (pokemonComponent.length === 0) {
    return (
      <div>
        <h4>No pokemon found</h4>
      </div>
    );
  } else {
    return (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "5px",
        }}
      >
        {pokemonComponent}
      </Box>
    );
  }
}
