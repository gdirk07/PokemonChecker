import PokemonId from "./PokemonId";
import Box from "@mui/system/Box";

export type PokemonSearchObj = {
  name: string,
  url: string,
}

export type PokemonSearchResultsProps = {
  pokemonQuery: PokemonSearchObj[],
  onPokemonSelected: (name: string, url: string) => void
}

export default function PokemonSearchResults ({pokemonQuery, onPokemonSelected}: PokemonSearchResultsProps) {
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
      <Box sx={
        { 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          padding: '5px' }
        }>
        {pokemonComponent}
      </Box>
    );
  }
}