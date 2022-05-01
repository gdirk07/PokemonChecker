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

  // Prefix for accessing pokemon data in browser localStorage
  private static localStoragePrefix = "pkc-pkmn_";

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
    this.pokemonTable[data.name] = item;

    // Store the item in localStorage, as well
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
   *
   */
  public savePokemonToStorage(saveEntry: storedPokemon): void {
    // localStorage.setItem("pokemonTable", JSON.stringify(this.pokemonTable));
    const keyName = this.generateLocalStorageKey(saveEntry.pokemon.name);
    if (keyName && keyName.length > 0) {
      localStorage.setItem(keyName, JSON.stringify(saveEntry));
    }
  }

  /**
   * Retrieve the entry from storage, null if it does not exist
   * @param pkName Name of the DTO to retrieve
   */
  public async getPokemonFromStorage(
    pkName: string
  ): Promise<storedPokemon | null> {
    const storedPokemon = localStorage.getItem(
      this.generateLocalStorageKey(pkName)
    );
    if (!storedPokemon) {
      return null;
    }

    const rawData = JSON.parse(storedPokemon);
    const rebuiltPokemon = await this.factory.createPokemon(rawData.pokemon);

    console.log(rebuiltPokemon);
    return {
      pokemon: rebuiltPokemon,
      expiry: rawData.expiry,
    };
  }

  /**
   * Method for accessing repository data from localStorage
   * @param pkName DTO 'name' key to use for storage
   */
  private generateLocalStorageKey(pkName: string): string {
    return PokemonRepository.localStoragePrefix + pkName;
  }

  /**
   * Instantiate the repository from localStorage
   *
   * TODO: Re-evaluate if we need a full load from storage at all?
   * If we store each entry (maybe prefix names) then we'd probably
   * just read them as necessary
   */
  public loadFromStorage(): void {
    const savedData = localStorage.getItem("pokemonTable");
    if (savedData) {
      const oldTable = JSON.parse(savedData);
      Object.keys(oldTable).forEach((key) => {
        const pokemonData = this.factory.createPokemonStub(oldTable[key]);
        this.setPokemonData(pokemonData);
      });
    }
  }
}
