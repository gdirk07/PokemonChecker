import React from 'react';
import { render } from '@testing-library/react';

class PokemonDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemonToLookup: ''
        };

    }

    componentDidUpdate(prevProps, prevState) {

        let newPokemon = this.props.pokemonSelected
        if (newPokemon !== prevProps.pokemonSelected) {
            this.setState({pokemonToLookup: newPokemon}, () =>console.log("New Pokemon:", newPokemon, "State: ", this.state.pokemonToLookup));

        }
    }
    render() {

        const {pokemonToLookup} = this.state;
        let pokemon;
        if (pokemonToLookup != undefined && pokemonToLookup != '') {
            pokemon = pokemonToLookup;
        }
        else {
            pokemon = 'Awaiting Pokemon Selection';
        }
        return (
                
            <div className="pokedex">  
                
                    <h2>{pokemon}</h2>
            </div>
        );
    }

}

export default PokemonDisplay;