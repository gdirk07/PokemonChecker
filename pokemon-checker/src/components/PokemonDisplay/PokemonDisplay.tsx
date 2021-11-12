import React from "react";
import PokemonDTO from "../../DataTransferObjects/PokemonDTO";
import { IPokemonData } from "../../interfaces/PokemonData";
import { PokemonFactory } from "../../factories/PokemonFactory";

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
    let baseStats: string;

    if (pokemon) {
      pokemonName = pokemon.name;
      dexId = `#${pokemon.dexId}`;
      displayDefault = pokemon.frontDefault;
      displayShiny = pokemon.frontShiny;
      type1 = pokemon.type1;
      type2 = pokemon.type2 ? pokemon.type2 : null;
      baseStats = "Total base stats: " + pokemon.baseStats.toString();
    } else {
      // as Display gets bigger, this will get messier
      pokemonName = "Awaiting Pokemon Selection";
      dexId = "";
      type1 = "";
      type2 = "";
      baseStats = "";
    }
    return (
      <div className="pokedex">
        <h2>
          {pokemonName}
          {dexId}
        </h2>
        <h5>{baseStats}</h5>
        <h5>
          {type1} {type2}
        </h5>
        {displayDefault ? (
          <img id="pokemonDisplay" src={displayDefault} alt={pokemonName}></img>
        ) : (
          <h2>No Pokemon</h2>
        )}
        {displayShiny ? (
          <img id="pokemonDisplay" src={displayShiny} alt={pokemonName}></img>
        ) : (
          <h2>No Shiny</h2>
        )}
      </div>
    );
  }
}

export default PokemonDisplay;
