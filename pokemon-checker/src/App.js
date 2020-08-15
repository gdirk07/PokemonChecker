import React, { Component } from 'react';
import './App.css';
import './components/PokemonSearch/PokemonSearchResults';
import PokemonSearchResults from './components/PokemonSearch/PokemonSearchResults';
import SearchBox from './components/SearchBar/SearchBar';
import PokemonDisplay from './components/PokemonDisplay/PokemonDisplay';

class App extends Component{
  constructor() {
      super();
      this.state = {
        pokemonList: [],
        pokemonName: '',
        searchfield: '',
        pokemonSelected: ''
      }
  }

  //Fetch all of the pokemon to start, no need to paginate
  componentDidMount() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1000offset=0').then(response=> response.json())
    .then(pokemonRetrieved => this.setState({ pokemonList: pokemonRetrieved.results}))
    .catch(console.log);        
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
    
  }

  onPokemonSelected = (pokemonClicked) => {
    this.setState({pokemonSelected: pokemonClicked})
  }

  render() {
    const {pokemonList, pokemonName, searchfield, pokemonSelected} = this.state;
    let filteredPokemon = [];
    if (searchfield.length < 2) {

    }
    else {
      filteredPokemon = pokemonList.filter(pokemonList =>{
        return pokemonList.name.toLowerCase().includes(searchfield.toLowerCase());
    })
  }
    if (pokemonSelected === '') {

    }
    else {
      
    }

    return(
      <div className="App">
          <h1>Search for a Pokemon</h1>
          <SearchBox  searchChange={this.onSearchChange}/>
          <PokemonSearchResults onPokemonSelected={this.onPokemonSelected} pokemonQuery={filteredPokemon} />
          <PokemonDisplay pokemonSelected={pokemonSelected}/>

      </div>
    )
  }
}

export default App;
//export default PokemonFetcher;