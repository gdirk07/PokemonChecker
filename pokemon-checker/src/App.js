import React, { Component } from "react";
import "./App.css";
import "./components/PokemonSearch/PokemonSearchResults";
import PokemonSearchResults from "./components/PokemonSearch/PokemonSearchResults";
import SearchBox from "./components/SearchBar/SearchBar";
import PokemonDisplay from "./components/PokemonDisplay/PokemonDisplay";

class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemonList: [],
      pokemonName: "",
      searchfield: "",
      pokemonSelected: "",
      pokemonUrl: "",
    };
  }

  //Fetch all of the pokemon to start, no need to paginate
  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1000offset=0")
      .then((response) => response.json())
      .then((pokemonRetrieved) =>
        this.setState({ pokemonList: pokemonRetrieved.results })
      )
      .catch(console.log);
  }
  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };

  onPokemonSelected = (pokemonClicked, url) => {
    if (url && url !== "") {
      this.setState({ pokemonSelected: pokemonClicked, pokemonUrl: url });
    }
  };

  render() {
    const { pokemonList, searchfield, pokemonUrl } = this.state;
    let filteredPokemon = [];
    if (searchfield.length < 2) {
      //do nothing, only really want to start searching when we have at least 2 characters
    } else {
      filteredPokemon = pokemonList.filter((pokemonList) => {
        return pokemonList.name
          .toLowerCase()
          .includes(searchfield.toLowerCase());
      });
    }
    return (
      <div className="App">
        <h1>Search for a Pokemon</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <PokemonSearchResults
          onPokemonSelected={this.onPokemonSelected}
          pokemonQuery={filteredPokemon}
        />
        <PokemonDisplay pokemonUrl={pokemonUrl} />
      </div>
    );
  }
}

export default App;
//export default PokemonFetcher;
