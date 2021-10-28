import React from "react";
import PokemonDTO from "../../DataTransferObjects/PokemonDTO";
import { getSelectedPokemon } from "../../services/PokemonService";

type displayProps = {
  pokemonUrl: string;
};

type displayState = {
  pokemonObject: {
    name?: string;
    id?: string;
    moves?: string[];
    type1?: string;
    type2?: string;
    sprites?: {
      frontDefault: string;
      frontShiny: string;
    };
  };
};

class PokemonDisplay extends React.Component<displayProps, displayState> {
  private pokemonToDisplay: PokemonDTO | null;

  constructor(props: displayProps) {
    super(props);
    this.state = {
      pokemonObject: {},
    };
    this.pokemonToDisplay = null;
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
      getSelectedPokemon(url)
        .then((pokemonRetrieved) => this.createPokemonObject(pokemonRetrieved))
        .catch(console.log);
    }
  }

  /**
   * Create a PokemonObject from the results retrieved
   * @param pokemonRetrieved the pokemon retrieved from the API
   */
  createPokemonObject(pokemonRetrieved: any): void {
    getSelectedPokemon(pokemonRetrieved.species.url)
      .then(pokemonSpeciesObject => {
        this.pokemonToDisplay = new PokemonDTO(pokemonRetrieved, pokemonSpeciesObject)
        this.setState({ pokemonObject: pokemonRetrieved })
      }
    )
  }

  render() {
    let pokemon = this.pokemonToDisplay;
    let pokemonName: string | undefined;
    let dexId: string;
    let displayDefault: string | undefined = "";
    let displayShiny: string | undefined = "";
    let type1: string | null;
    let type2: string | null;

    if (pokemon) {
      pokemonName = pokemon.name;
      dexId = `#${pokemon.dexId}`;
      displayDefault = pokemon.frontDefault;
      displayShiny = pokemon.frontShiny;
      type1 = pokemon.type1;
      type2 = pokemon.type2 ? pokemon.type2 : null;
    } else {
      // as Display gets bigger, this will get messier
      pokemonName = "Awaiting Pokemon Selection";
      dexId = "";
      type1 = "";
      type2 = "";
    }
    return (
      <div className="pokedex">
        <h2>
          {pokemonName}
          {dexId}
        </h2>
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
