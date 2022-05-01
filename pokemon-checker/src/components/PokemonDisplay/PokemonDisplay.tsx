import { useCallback, useEffect, useState } from "react";
import PokemonDTO from "../../DataTransferObjects/PokemonDTO";
import { QuickView } from "./PokemonQuickCardView";
import "../../App.css";
import WaitingView from "./DefaultDisplayView";
import Container, { ContainerProps } from "@mui/material/Container";
import { styled } from "@mui/material/styles";

const DisplayBorder = styled(Container)<ContainerProps>(({ theme }) => ({
  border: `3px double`,
  borderRadius: `5px`,
  padding: `10px`,
}));

type displayProps = {
  getPokemonData: (url: string) => Promise<any>;
  pokemonUrl: string;
};

export const PokemonDisplay = (props: displayProps) => {
  const [pokemonObject, setPokemonObject] = useState<PokemonDTO>();
  const { getPokemonData, pokemonUrl } = props;
  /**
   * Create a PokemonObject from the results retrieved
   * @param pokemonRetrieved the pokemon retrieved from the API
   */
  const createPokemonObject = useCallback(
    (url: string) => {
      if (url && url.length > 0) {
        getPokemonData(url)
          .then((pokemon) => {
            console.log(pokemon);
            setPokemonObject(pokemon)
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
      <DisplayBorder maxWidth="sm">
        <QuickView pokemon={pokemonObject} />
      </DisplayBorder>
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
