import React, { Component } from 'react';
import './App.css';
import './components/PokemonSearch/PokemonInfo';
import PokemonInfo from './components/PokemonSearch/PokemonInfo';
import SearchBox from './components/SearchBar/SearchBar';

class App extends Component{
  constructor() {
      super();
      this.state = {
        pokemonList: [],
        pokemonName: '',
        searchfield: '',
      }
  }
  componentDidMount() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1000offset=0').then(response=> response.json())
    .then(pokemonRetrieved => this.setState({ pokemonList: pokemonRetrieved.results}))
    .catch(console.log);        
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
    
  }

  onPokemonSelected = () => {
    console.log("hi");
  }

  render() {
    const {pokemonList, pokemonName, searchfield} = this.state;
    let filteredPokemon = [];
    if (searchfield === '') {

    }
    else {
      filteredPokemon = pokemonList.filter(pokemonList =>{
        return pokemonList.name.toLowerCase().includes(searchfield.toLowerCase());
    })
  }

    return(
      <div className="App">
          <h1>Search for a Pokemon</h1>
          <SearchBox  searchChange={this.onSearchChange}/>
          <PokemonInfo onPokemonSelected={this.onPokemonSelected} pokemonQuery={filteredPokemon} />
            {//<PokemonDisplay />
            }
      </div>
    )
  }
}

export default App;
//export default PokemonFetcher;