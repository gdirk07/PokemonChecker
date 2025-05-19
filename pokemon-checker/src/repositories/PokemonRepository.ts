import PokemonDTO from "../DataTransferObjects/PokemonDTO";
import { TimeService } from "../services/TimeService";
import { PokemonFactory } from "../factories/PokemonFactory";

type storedPokemon = {
  pokemon: PokemonDTO;
  expiry: number;
};

export class PokemonRepository {
  private pokemonTable: Record<string, storedPokemon>;
  private factory: PokemonFactory;
  private timeService: TimeService;

  private static localStorageTableKey = "pokemonTable";

  constructor() {
    this.pokemonTable = {};
    this.factory = new PokemonFactory();
    this.timeService = new TimeService();
  }

  /**
   * Assigns a full pokemon data payload to the repository, and sets
   * an expiry timestamp for that data.
   * @param data Pokemon to write to repository
   * @param expire Defaults to 1h. Determines how long this data is valid
   */
  public setPokemonData(
    data: PokemonDTO,
    expire = this.timeService.generateExpiryTimestamp()
  ): void {
    const item: storedPokemon = {
      pokemon: data,
      expiry: expire,
    };

    // Storage key is pokemon.name, because fetching all pokemon names
    // returns an  array of stubs with valid names and 'dexId: -1'
    // List of all pokemon comes from App.tsx when we resolve pokemon stubs
    this.pokemonTable[data.name] = item;
  }

  /**
   * Determines whether a pokemon entry's data is expired
   * @param pokemon Name of the pokemon to check against
   */
  public isExpired(pokemon: string): boolean {
    const now = new Date();
    const foundPokemon = this.pokemonTable[pokemon];

    return foundPokemon && foundPokemon.expiry < now.getTime();
  }

  /**
   * Retrieves a full pokemon payload, if applicable
   * @param name Name of the Pokemon to be retrieved
   */
  public getPokemonData(name: string): PokemonDTO | null {
    return this.pokemonTable[name] ? this.pokemonTable[name].pokemon : null;
  }

  /**
   * Determines whether or not the repository is empty
   */
  public isEmpty(): boolean {
    return !(Object.keys(this.pokemonTable).length > 0);
  }

  /**
   * Fetches the full extent of stored Pokemon data in the repository.
   *
   * Because this is used to return the full list of all pokemon, validity
   * of the timestamps is irrelevant
   */
  public getAllPokemon(): PokemonDTO[] {
    return (
      Object.keys(this.pokemonTable).map(
        (key) => this.pokemonTable[key].pokemon
      ) ?? []
    );
  }

  /**
   * Stores a large array of pokemon stub data into the repository at once.
   * @param payload Array to be saved to the repo
   */
  public saveStubs(payload: PokemonDTO[]): void {
    payload.forEach((pokemon) => {
      const knownPoke = this.pokemonTable[pokemon.name];
      // There is no need to save a stub over a non-expired full DTO.
      if (
        knownPoke &&
        !this.isExpired(pokemon.name) &&
        knownPoke.pokemon.hasFullData
      ) {
        return;
      }
      this.setPokemonData(pokemon);
    });
  }

  /**
   * Instantiate the repository from localStorage
   */
  public loadFromStorage(): void {
    const savedData = localStorage.getItem(PokemonRepository.localStorageTableKey);
    if (savedData) {
      const oldTable = JSON.parse(savedData);
      Object.keys(oldTable).forEach((key) => {
        // TODO: update 'pokemonData' to depend on if retrieved entry is stub or not
        // Stub data is as follows:
        // {name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/'}
        // Resulting DTO will have the following characteristics
        // dexId: -1, abilities: [], moves: [], type1: ""
        const pokemonData = this.factory.createPokemonStub(oldTable[key]);

        // A full DTO retrieved from serializtion will have more

        this.setPokemonData(pokemonData);
      });
    }
  }
}
