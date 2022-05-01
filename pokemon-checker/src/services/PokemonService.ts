import { PokemonRepository } from "../repositories/PokemonRepository";
import { PokemonFactory } from "../factories/PokemonFactory";
import { IPokemonData, IPokemonStub } from "../interfaces/PokemonData";
import PokemonDTO from "../DataTransferObjects/PokemonDTO";

/**
 * Service for handling fetches related to Pokemon, from
 * name/url stubs to full Pokemon DTO data.
 */
export class PokemonService {
  private getAllUrl: string;
  private factory: PokemonFactory;
  private repository: PokemonRepository;

  constructor() {
    this.getAllUrl = "https://pokeapi.co/api/v2/pokemon?limit=1000offset=0";
    this.repository = new PokemonRepository();
    this.factory = new PokemonFactory();

    console.log(this.factory);
  }

  /**
   * Fills the repository with skeleton DTOs and URLs,
   * assigning a timestamp in the process.
   * @param payload List of pokemon to store in the repository
   */
  private storePokemonStubs(payload: PokemonDTO[]): void {
    try {
      // Save the pokemon data to localStorage
      this.repository.saveStubs(payload);
      console.log(payload[0]);
      console.log(this.repository);
      // this.repository.savePokemon();

      // Set the timestamp for 30 minutes
      // this.repository.setExpiryTimestamp(30);
    } catch (e: unknown) {
      if (typeof e === "string") {
        console.log(`Could not store pokemon stubs: ${e}`);
      } else if (e instanceof Error) {
        console.log(`Failed to store pokemon stub: ${e.message}`);
      } else {
        console.log(`Unknown error storing pokemon stubs: ${e}`);
      }
    }
  }

  /**
   * Catches returned key-value pairs of pokemon names from the API
   * @param response Returned payload from fetching pokemon names
   */
  private resolvePokemonStubs = async (
    response: Response
  ): Promise<PokemonDTO[]> => {
    const data = await response.json();
    const results = data.results;
    //the query fetches all pokemon AND forms (megas etc), but we don't want
    //forms so filter out any result that has a url > 10000
    const filterResults = results.map(
      (stub: IPokemonStub) => {
        //cut the final "/" out
        const url = stub.url.substring(0, stub.url.length - 1).split("/");

        const id = Number(url.pop());
        if (id && id < 10000) return this.factory.createPokemonStub(stub);
        return false;
      }
    );
    // Store the pokemon names in the repository
    this.storePokemonStubs(filterResults);

    return filterResults;
  };

  /**
   * Search ALL pokemon with their name and individual url
   */
  public getAllPokemon = async () => {
    // if (this.repository.isExpired) {
      if (true){
      return await fetch(this.getAllUrl).then(this.resolvePokemonStubs);
    } else {
      this.repository.loadFromStorage();
      return Promise.resolve(this.repository.getAllPokemon());
    }
  }

  /**
   * Lookup an individual pokemon
   * @param url the url for the specific pokemon
   */
  public getPokemon = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    } else {
      const data = await response.json();
      const pokemonPayload = data as IPokemonData;
      return this.factory.createPokemon(pokemonPayload);
    }
  };
}
