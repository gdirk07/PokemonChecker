import { useCallback, useEffect, useMemo, useState } from "react";
import PokemonDTO from "../../DataTransferObjects/PokemonDTO";
import { PokemonFactory } from "../../factories/PokemonFactory";
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
  // TODO (jeremy): Elminate the factory declaration! The service method is
  // passed to this component as a prop.
  const pokemonFactory: PokemonFactory = useMemo(
    () => new PokemonFactory(),
    []
  );
  const { getPokemonData, pokemonUrl } = props;
  /**
   * Create a PokemonObject from the results retrieved
   * @param pokemonRetrieved the pokemon retrieved from the API
   */
  const createPokemonObject = useCallback(
    (url: string) => {
      if (url && url.length > 0) {
        getPokemonData(url)
          .then((data) => pokemonFactory.createPokemon(data))
          .then((pokemon) => pokemonFactory.fetchAbilities(pokemon))
          .then((pokemon) => setPokemonObject(pokemon));
      }
    },
    [getPokemonData, pokemonFactory]
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
