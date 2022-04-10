import PokemonDTO from "../DataTransferObjects/PokemonDTO";
import { Time } from "../constants/Time";
import { PokemonFactory } from "../factories/PokemonFactory";

export class PokemonRepository {
  private pokemonTable: Record<string, PokemonDTO>;
  private expiryTimestamp: number;
  private factory: PokemonFactory;

  // Used to check against localStorage
  private static storageTimestampKey = "expiryTimestamp";

  constructor() {
    this.pokemonTable = {};
    this.factory = new PokemonFactory();
    this.expiryTimestamp = this.initTimestamp();
  }

  /**
   * Returns the existing timestamp from localStorage, if it exists.
   * Zero indicates that localStorage is un-set
   */
  public initTimestamp(): number {
    const oldStamp = Number(
      localStorage.getItem(PokemonRepository.storageTimestampKey)
    );
    return oldStamp ?? 0;
  }

  /**
   * Sets a time for which the repository data will become stale.
   * @param minutes Duration to set the repository expiry time.
   */
  public setExpiryTimestamp(minutes = 60): void {
    const newStamp =
      Date.now() +
      minutes * Time.MILLISECONDS_PER_SECOND * Time.SECONDS_PER_MINUTE;

    localStorage.setItem(
      PokemonRepository.storageTimestampKey,
      newStamp.toString()
    );
  }

  /**
   * Determines whether the expiry timestamp has passed
   */
  public get isExpired(): boolean {
    return this.expiryTimestamp < Date.now();
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

  /**
   * Fetches the full extent of stored Pokemon data in the repository.
   */
  public getAllPokemon(): PokemonDTO[] {
    return (
      Object.keys(this.pokemonTable).map((key) => this.pokemonTable[key]) ?? []
    );
  }

  public loadPokemonBatch(payload: PokemonDTO[]): void {
    payload.forEach((pokemon) => this.setPokemonData(pokemon));
  }

  /**
   * Saves the state of the current table to localStorage
   */
  public savePokemon(): void {
    localStorage.setItem("pokemonTable", JSON.stringify(this.pokemonTable));
  }

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
