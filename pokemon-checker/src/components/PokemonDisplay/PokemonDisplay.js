import React from 'react';

class PokemonDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemonObject: ''
        };
    }

    componentDidUpdate(prevProps, prevState) {
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
        let pokemonName;
        let display = false;
        if (pokemonObject) {
            display = true;
            pokemonName = pokemonObject.name;
            display = pokemonObject.sprites.back_default;
        }
        else {
            display = false;
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