import PokemonDTO from "../DataTransferObjects/PokemonDTO";
import { IPokemonStub } from "../interfaces/PokemonData";
import { Time } from "../constants/Time";

export class PokemonRepository {
  private pokemonNames: Record<string, string>;
  private pokemonTable: Record<string, PokemonDTO>;
  private expiryTimestamp: number;

  constructor() {
    this.pokemonNames = {};
    this.pokemonTable = {};
    this.expiryTimestamp = 0;
  }

  /**
   * Sets a time for which the repository data will become stale.
   * @param minutes Duration to set the repository expiry time.
   */
  public setExpiryTimestamp(minutes = 60): void {
    this.expiryTimestamp =
      Date.now() +
      (minutes * Time.MILLISECONDS_PER_SECOND * Time.SECONDS_PER_MINUTE);
  }

  public get expiryTime(): number {
    return this.expiryTimestamp;
  };

  /**
   * Fills the table with initial pokemon data
   * The name record stores key/value pairs of names and URLs.
   * e.g. { 'bulbasaur': 'https://...', 'ivysaur': 'https://', ...}
   * For reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
   * @param batch Returned stubs from a bundled API call
   */
  public loadPokemonNames(batch: IPokemonStub[]): void {
    this.pokemonNames = batch.reduce(
      (index, pokemonStub) => ({
        ...index,
        [pokemonStub.name]: pokemonStub.url,
      }),
      {}
    );
  }

  /**
   * Retrieves the URL of the pokemon, if it exists
   * @param name Pokemon to retrieve
   */
  public getPokemonUrl(name: string): string {
    return this.pokemonNames[name] ?? "";
  }

  /**
   * Assigns a full pokemon data payload to the repository
   * @param data Pokemon to write to repository
   */
  public setPokemonData(data: PokemonDTO): void {
    this.pokemonTable[data.name] = data;
  }

  /**
   * Retrieves a full pokemon payload, if applicable
   * @param name Name of the Pokemon to be retrieved
   */
  public getPokemonData(name: string): PokemonDTO | null {
    return this.pokemonTable[name] ?? null;
  }
}
