import { useState, useEffect } from "react";
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

export const PokemonDisplay = (props: displayProps ) => {
  const [pokeonObject,setPokemonObject] = useState<PokemonDTO>();
  //TODO (jeremy): Move this factory to a service! Views shouldn't control this.
  const pokemonFactory: PokemonFactory = new PokemonFactory();

  useEffect(() => {
      fetchPokemonObject();
  })

  const fetchPokemonObject = () => {
    const url = props.pokemonUrl;
    if (url && url !== "") {
      props.getPokemonData(url)
        .then((pokemonRetrieved) => createPokemonObject(pokemonRetrieved))
        .catch(console.log);
    }
  }

  /**
   * Create a PokemonObject from the results retrieved
   * @param pokemonRetrieved the pokemon retrieved from the API
   */
  const createPokemonObject = (pokemonRetrieved: IPokemonData): void => {
    let pokemonToDisplay = pokemonFactory.createPokemon(pokemonRetrieved);
    setPokemonObject(pokemonToDisplay);
  }

  if (pokeonObject) {
    return (
      <DisplayBorder maxWidth="sm">
        <QuickView pokemon={pokeonObject} />
      </DisplayBorder>
    );
  } 
  else {
    return (
      <div className="AwaitingPokemon">
        <WaitingView />
      </div>
    );
  }
}

export default PokemonDisplay;
