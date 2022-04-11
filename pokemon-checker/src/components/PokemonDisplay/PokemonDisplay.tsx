import { useCallback, useEffect, useMemo, useState } from "react";
import PokemonDTO from "../../DataTransferObjects/PokemonDTO";
import { IPokemonData } from "../../interfaces/PokemonData";
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
  pokemonUrl: string;
  getPokemonData: (url: string) => Promise<any>;
};

export const PokemonDisplay = (props: displayProps) => {
  const [pokeonObject, setPokemonObject] = useState<PokemonDTO>();
  // TODO (jeremy): Elminate the factory declaration! The service method is
  // passed to this component as a prop.
  const pokemonFactory: PokemonFactory = useMemo(
    () => new PokemonFactory(),
    []
  );
  /**
   * Create a PokemonObject from the results retrieved
   * @param pokemonRetrieved the pokemon retrieved from the API
   */
  const createPokemonObject = useCallback(
    (pokemonRetrieved: IPokemonData): void => {
      let pokemonToDisplay = pokemonFactory.createPokemon(pokemonRetrieved);
      setPokemonObject(pokemonToDisplay);
    },
    [pokemonFactory]
  );

  // TODO: Eliminate this method. 'getPokemonData' as a Service method
  // should already return the PokemonDTO - it currently returns raw JSON.
  const fetchPokemonObject = useCallback(() => {
    const url = props.pokemonUrl;
    if (url && url.length > 0) {
      props
        .getPokemonData(url)
        .then((pokemonRetrieved) => createPokemonObject(pokemonRetrieved))
        .catch(console.log);
    }
  }, [props, createPokemonObject]);

  useEffect(() => {
    fetchPokemonObject();
  }, [fetchPokemonObject]);

  if (pokeonObject) {
    return (
      <DisplayBorder maxWidth="sm">
        <QuickView pokemon={pokeonObject} />
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
