import React, { Component } from "react";
import "./App.css";
import "./components/PokemonSearch/PokemonSearchResults";
import PokemonSearchResults from "./components/PokemonSearch/PokemonSearchResults";
import SearchBox from "./components/SearchBar/SearchBar";
import PokemonDisplay from "./components/PokemonDisplay/PokemonDisplay";
import { PokemonService } from "./services/PokemonService";
import PokemonDTO from "./DataTransferObjects/PokemonDTO";
import { scrubPokemonName } from "./utils/Helper";

type AppState = {
  pokemonList: PokemonDTO[];
  pokemonName: string;
  searchfield: string;
  pokemonSelected: string;
  pokemonUrl: string;
};

class App extends Component<any, AppState> {
  private pokeService: PokemonService;

  constructor(props: any) {
    super(props);
    this.state = {
      pokemonList: [],
      pokemonName: "",
      searchfield: "",
      pokemonSelected: "",
      pokemonUrl: "",
    };

    this.pokeService = new PokemonService();
  }

  //Fetch all of the pokemon to start, no need to paginate
  componentDidMount() {
    this.pokeService
      .getAllPokemon()
      .then((pokemonRetrieved) => {
        pokemonRetrieved.map((pokemon: {name: string, url: string})  => {
          return pokemon.name 
            = scrubPokemonName(pokemon.name.toLowerCase());
        });
        this.setState({ pokemonList: pokemonRetrieved });
      })
      .catch(console.log);
  }

  onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event && event.target && event.target.value) {
      this.setState({ searchfield: event.target.value });
    }
  };

  onPokemonSelected = (pokemonClicked: string, url: string) => {
    if (url && url !== "") {
      this.setState({ pokemonSelected: pokemonClicked, pokemonUrl: url });
    }
  };

  render() {
    const { pokemonList, searchfield, pokemonUrl } = this.state;
    let filteredPokemon: any[] = [];
    if (searchfield.length < 2) {
      //do nothing, only really want to start searching when we have at least 2 characters
    } else {
      filteredPokemon = pokemonList.filter((pokemon) => {
        let name: string = pokemon.name.toLowerCase();
        return name.includes(searchfield.toLowerCase());
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
        <PokemonDisplay
          getPokemonData={this.pokeService.getPokemon}
          pokemonUrl={pokemonUrl}
        />
      </div>
    );
  }
}

export default App;
//export default PokemonFetcher;
