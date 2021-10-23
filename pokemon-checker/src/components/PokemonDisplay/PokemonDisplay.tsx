import React from 'react';
import PokemonDTO from '../../DataTransferObjects/PokemonDTO';

type displayProps = {
  pokemonUrl: string;
};

type displayState = {
    pokemonObject: {
        name?: string,
        id?: string,
        moves?: string[],
        type1?: string,
        type2?: string
        sprites?: {
            back_default: string
        }
    }
}

class PokemonDisplay extends React.Component<displayProps, displayState> {
    private pokemonToDisplay: PokemonDTO | null;

    constructor(props: displayProps) {
        super(props);
        this.state = {
            pokemonObject: {}
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

  fetchPokemonObject()
  {
    const url = this.props.pokemonUrl;
    if (url && url !== '')
    {
        fetch(url).then(response => response.json())
        .then(pokemonRetrieved => this.createPokemonObject(pokemonRetrieved))
        .catch(console.log); 
    }
  }
  /**
   * Create a PokemonObject from the results retrieved
   * @param pokemonRetrieved the pokemon retrieved from the API
   */
  createPokemonObject(pokemonRetrieved: any): void
  {
    this.pokemonToDisplay = new PokemonDTO(
        pokemonRetrieved.name,
        pokemonRetrieved.id,
        pokemonRetrieved.moves,
        pokemonRetrieved.types[0],
        pokemonRetrieved.types[1] ? pokemonRetrieved.types[1] : null
    )

    this.setState({ pokemonObject: pokemonRetrieved})
  }

  render() {
    const {pokemonObject} = this.state;
    let pokemonName: string | undefined;
    let dexId: string;
    let display: string | undefined = '';
    if (this.pokemonToDisplay) {
        pokemonName = this.pokemonToDisplay.name;
        dexId = `#${this.pokemonToDisplay.dexId}`;
        display = pokemonObject.sprites?.back_default;
    }
    else {
        pokemonName = 'Awaiting Pokemon Selection';
        dexId = "";
    }
    return (
        <div className="pokedex">  
                <h2>{pokemonName}</h2>
                <h2>{dexId}</h2>
                {display ? (<img id="pokemonDisplay" src={display} alt={pokemonName}></img>) :
                <h2>No Pokemon</h2>}
        </div>
    );
  }
}

export default PokemonDisplay;
