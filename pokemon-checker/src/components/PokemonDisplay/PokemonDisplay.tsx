import React from "react";
import PokemonDTO from "../../DataTransferObjects/PokemonDTO";
import { IPokemonData } from "../../interfaces/PokemonData";
import { PokemonFactory } from "../../factories/PokemonFactory";
import { QuickView } from "./PokemonQuickCardView";
import "../../App.css";
import WaitingView from "./DefaultDisplayView";
import Container from "@mui/material/Container";

type displayProps = {
  pokemonUrl: string;
  getPokemonData: (url: string) => Promise<any>;
};

type displayState = {
  pokemonObject: {
    name?: string;
    id?: string;
    moves?: string[];
    type1?: string;
    type2?: string | null;
    sprites?: {
      frontDefault: string;
      frontShiny: string;
    };
  };
};

class PokemonDisplay extends React.Component<displayProps, displayState> {
  private pokemonToDisplay: PokemonDTO | null;
  //TODO (jeremy): Move this factory to a service! Views shouldn't control this.
  private pokemonFactory: PokemonFactory;

  constructor(props: displayProps) {
    super(props);
    this.state = {
      pokemonObject: {},
    };
    this.pokemonToDisplay = null;
    this.pokemonFactory = new PokemonFactory();
  }

  componentDidUpdate(prevProps: displayProps) {
    const prevUrl = prevProps.pokemonUrl;
    const url = this.props.pokemonUrl;
    if (prevUrl !== url) {
      this.fetchPokemonObject();
    }
  }

  fetchPokemonObject() {
    const url = this.props.pokemonUrl;
    if (url && url !== "") {
      this.props.getPokemonData(url)
        .then((pokemonRetrieved) => this.createPokemonObject(pokemonRetrieved))
        .catch(console.log);
    }
  }

  /**
   * Create a PokemonObject from the results retrieved
   * @param pokemonRetrieved the pokemon retrieved from the API
   */
  createPokemonObject(pokemonRetrieved: IPokemonData): void {
    this.pokemonToDisplay = this.pokemonFactory.createPokemon(pokemonRetrieved);
    this.setState({ pokemonObject: this.pokemonToDisplay.getDisplayStats() });
  }

  render() {
    let pokemon = this.pokemonToDisplay;
    let pokemonName: string | undefined;
    let dexId: string;
    let displayDefault: string | undefined = "";
    let displayShiny: string | undefined = "";
    let type1: string | null;
    let type2: string | null;
    let stats: {
      hp: number;
      attack: number;
      defense: number;
      spAttack: number;
      spDefense: number;
      speed: number;
    } | null;
    let baseStats: string;

    if (pokemon) {
      pokemonName = pokemon.name;
      dexId = `#${pokemon.dexId}`;
      displayDefault = pokemon.frontDefault;
      displayShiny = pokemon.frontShiny;
      type1 = pokemon.type1;
      type2 = pokemon.type2 ? pokemon.type2 : null;
      stats = pokemon.stats;
      baseStats = "Total base stats: " + pokemon.baseStats.toString();

      return (
        <Container maxWidth="sm">
          <QuickView
            pokemonName = {pokemonName} 
            dexId = {dexId} 
            baseStats = {baseStats}
            stats = {stats}
            type1 = {type1} 
            type2 = {type2} 
            displayDefault = {displayDefault} 
            displayDefaultS = {displayShiny}
          />
        </Container>
      );
    } else {
      // as Display gets bigger, this will get messier
      pokemonName = "Awaiting Pokemon Selection";
      dexId = "";
      displayDefault = "";
      displayShiny = "";
      type1 = "";
      type2 = "";
      stats = null;
      baseStats = "";

      return (
        <div className="AwaitingPokemon">
          <WaitingView />
        </div>
      );
    }
  }
}

export default PokemonDisplay;
