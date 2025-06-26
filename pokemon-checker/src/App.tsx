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
  displayedPokemon: PokemonDTO | null;
};

class App extends Component<any, AppState> {
  private pokeService: PokemonService;

  constructor(props: any) {
    super(props);
    this.pokeService = new PokemonService();
    this.state = {
      pokemonList: [],
      pokemonResults: [],
      displayedPokemon: null,
    };
  }

  //Fetch all of the pokemon to start, no need to paginate
  componentDidMount() {
    this.pokeService
      .getAllPokemon()
      .then((pokemonRetrieved) => {
        pokemonRetrieved.map((pokemon: PokemonDTO) => {
          if (!(pokemon && pokemon.name)) {
            return null;
          }
          return (pokemon.name = scrubPokemonName(pokemon.name.toLowerCase()));
        });
        this.setState({ pokemonList: pokemonRetrieved });
      })
      .catch(console.log);
  }

  // On unmount, preserve the repository as localStorage
  componentWillUnmount(): void {
    console.log("App is dismounting!");
    this.pokeService.deconstructor();
  }

  /**
   * Filters the held list of pokemon down to what was input on the search form
   * @param event Triggered by search input field. Carries text.
   */
  onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let filteredPokemon: PokemonDTO[] = [];
    if (event && event.target && event.target.value) {
      const searchField = event.target.value;
      filteredPokemon =
        searchField.length > 1
          ? this.state.pokemonList.filter((pokemon) => {
              if (!(pokemon && pokemon.name)) {
                return null;
              }
              let name: string = pokemon.name.toLowerCase();
              return name.includes(searchField.toLowerCase());
            })
          : [];
    }
    this.setState({ pokemonResults: filteredPokemon });
  };

  /**
   * Receives API stub data from the selection event to request
   * the Pokemon's data from the Service (local or external)
   * @param name Identifier for the pokemon from the API stub
   * @param url Pointer to the full DTO payload
   */
  onPokemonSelected = async (name: string, url: string) => {
    const retrievedPokemon = await this.pokeService.fetchPokemon({ name, url });
    this.setState({ displayedPokemon: retrievedPokemon });
  };

  render() {
    const { pokemonResults, displayedPokemon } = this.state;

    return (
      <div className="App">
        <h1>Search for a Pokemon</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <PokemonSearchResults
          onPokemonSelected={this.onPokemonSelected}
          pokemonQuery={pokemonResults}
        />
        <PokemonDisplay pokemonToRender={displayedPokemon} />
      </div>
    );
  }
}

export default App;
//export default PokemonFetcher;
