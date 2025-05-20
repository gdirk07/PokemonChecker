import { useCallback, useEffect, useState } from "react";
import PokemonDTO from "../../DataTransferObjects/PokemonDTO";
import { QuickView } from "./PokemonQuickCardView";
import "../../App.css";
import WaitingView from "./DefaultDisplayView";
import Container from "@mui/material/Container";

type displayProps = {
  getPokemonData: (url: string) => Promise<any>;
  pokemonUrl: string;
};

export const PokemonDisplay = (props: displayProps) => {
  const [pokemonObject, setPokemonObject] = useState<PokemonDTO>();
  const { getPokemonData, pokemonUrl } = props;

  //TODO: the display should not be doing the fetch itself.
  /**
   * This display component should not have any idea about URLs or API calls
   * The only dependency view components should have is on the service(s)
   * intended to provide this data.
   */
  /**
   * Create a PokemonObject from the results retrieved
   * @param pokemonRetrieved the pokemon retrieved from the API
   */
  const createPokemonObject = useCallback(
    (url: string) => {
      if (url && url.length > 0) {
        getPokemonData(url).then((pokemon) => {
          console.log(pokemon);
          setPokemonObject(pokemon);
        });
      }
    },
    [getPokemonData]
  );

  useEffect(() => {
    createPokemonObject(pokemonUrl);
  }, [pokemonUrl, createPokemonObject]);

  if (pokemonObject) {
    return (
      <Container maxWidth="sm">
        <QuickView pokemon={pokemonObject} />
      </Container>
    );
  } else {
    return (
      <div className="AwaitingPokemon">
        <WaitingView />
      </div>
    );
  }
};

export default PokemonDisplay;
