import React, { Component } from 'react';
import './App.css';
import './components/PokemonInfo';
import PokemonInfo from './components/PokemonInfo';
import SearchBox from './components/SearchBar';

class App extends Component{
  constructor() {
      super();
      this.state = {
        pokemon: [],
        pokemonName: '',
        searchfield: ''
      }
  }
  componentDidMount() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1000offset=0').then(response=> response.json())
    .then(pokemonRetrieved => this.setState({ pokemon: pokemonRetrieved.results}))
    .catch(console.log);        
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
    
  }

  render() {
    const {pokemon, searchfield} = this.state;
    const selectedPokemon = pokemon[(searchfield-1)];
    let bottomText = <h4>No Pokemon Selected</h4>;
    if (selectedPokemon) {
      bottomText = <h4>{selectedPokemon.name}</h4>;
    }
    return(
      <div className="App">
        <header className="App-header">
          <h1>Select a pokemon based off ID</h1>
          <SearchBox  searchChange={this.onSearchChange}/>
          {bottomText}
        </header>
      </div>
    )
  }
}

export default App;
//export default PokemonFetcher;