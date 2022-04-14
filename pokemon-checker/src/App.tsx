import React, { Component } from "react";
import "./App.css";
import "./components/PokemonSearch/PokemonSearchResults";
import PokemonSearchResults from "./components/PokemonSearch/PokemonSearchResults";
import SearchBox from "./components/SearchBar/SearchBar";
import PokemonDisplay from "./components/PokemonDisplay/PokemonDisplay";
import { PokemonService } from "./services/PokemonService";
import PokemonDTO from "./DataTransferObjects/PokemonDTO";
import { scrubPokemonName } from "./utils/NameScrubbingHelper";

type AppState = {
  pokemonList: PokemonDTO[];
  pokemonResults: PokemonDTO[];
  pokemonUrl: string;
};

class App extends Component<any, AppState> {
  private pokeService: PokemonService;

  constructor(props: any) {
    super(props);
    this.state = {
      pokemonList: [],
      pokemonResults: [],
      pokemonUrl: "",
    };

    this.pokeService = new PokemonService();
  }

  //Fetch all of the pokemon to start, no need to paginate
  componentDidMount() {
    this.pokeService
      .getAllPokemon()
      .then((pokemonRetrieved) => {
        pokemonRetrieved.map((pokemon: { name: string; url: string }) => {
          return (pokemon.name = scrubPokemonName(pokemon.name.toLowerCase()));
        });
        this.setState({ pokemonList: pokemonRetrieved });
      })
      .catch(console.log);
  }

  onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let filteredPokemon: PokemonDTO[] = [];
    if (event && event.target && event.target.value) {
      const searchField = event.target.value;
      filteredPokemon =
        searchField.length > 1
          ? this.state.pokemonList.filter((pokemon) => {
              let name: string = pokemon.name.toLowerCase();
              return name.includes(searchField.toLowerCase());
            })
          : [];
    }
    this.setState({ pokemonResults: filteredPokemon });
  };

  onPokemonSelected = (url: string) => {
    if (url && url !== "") {
      this.setState({ pokemonUrl: url });
    }
  };

  render() {
    const { pokemonResults, pokemonUrl } = this.state;

    return (
      <div className="App">
        <h1>Search for a Pokemon</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <PokemonSearchResults
          onPokemonSelected={this.onPokemonSelected}
          pokemonQuery={pokemonResults}
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
