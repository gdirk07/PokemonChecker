import React from 'react';

type displayProps = {
    pokemonUrl: string
}

type displayState = {
    pokemonObject: {
        name?: string,
        sprites?: {
            back_default: string
        }
    }
}

class PokemonDisplay extends React.Component<displayProps, displayState> {
    constructor(props: displayProps) {
        super(props);
        this.state = {
            pokemonObject: {}
        };
    }

    componentDidUpdate(prevProps: displayProps, prevState) {
        const prevUrl = prevProps.pokemonUrl;
        const url = this.props.pokemonUrl;
        if (prevUrl !== url)
        {
            this.fetchPokemonObject();
        }
    }

    fetchPokemonObject()
    {
        const url = this.props.pokemonUrl;
        if (url && url !== '')
        {
            fetch(url).then(response=> response.json())
            .then(pokemonRetrieved => this.setState({ pokemonObject: pokemonRetrieved}))
            .catch(console.log); 
        }
    }

    render() {
        const {pokemonObject} = this.state;
        let pokemonName: string;
        let display = '';
        if (pokemonObject) {
            pokemonName = pokemonObject.name;
            display = pokemonObject.sprites.back_default;
        }
        else {
            pokemonName = 'Awaiting Pokemon Selection';
        }
        return (
            <div className="pokedex">  
                    <h2>{pokemonName}</h2>
                    {display ? (<img id="pokemonDisplay" src={display} alt={pokemonName}></img>) :
                    <h2>No Pokemon</h2>}
            </div>
        );
    }

}

export default PokemonDisplay;