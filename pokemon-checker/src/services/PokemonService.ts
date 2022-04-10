import { PokemonRepository } from "../repositories/PokemonRepository";
import { PokemonFactory } from "../factories/PokemonFactory";
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
  }

  /**
   * Fills the repository with skeleton DTOs and URLs,
   * assigning a timestamp in the process.
   * @param payload List of pokemon to store in the repository
   */
  private storePokemonStubs(payload: PokemonDTO[]): void {
    try {
      // Save the pokemon data to localStorage
      this.repository.loadPokemonBatch(payload);
      this.repository.savePokemon();

      // Set the timestamp for 30 minutes
      this.repository.setExpiryTimestamp(30);
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
    const filterResults = results.filter(
      (filter: { name: string; url: string }) => {
        //cut the final "/" out
        const url = filter.url.substring(0, filter.url.length - 1).split("/");

        const id = Number(url.pop());
        if (id && id < 10000) return this.factory.createPokemonStub(filter);
        return false;
      }
    );
    // Store the pokemon names in the repository
    this.storePokemonStubs(filterResults);

    // console.log(filterResults);

    return filterResults;
  };

  /**
   * Search ALL pokemon with their name and individual url
   * @TODO We ought to fix what the pokemonList in App.tsx consumes.
   */
  public async getAllPokemon(): Promise<PokemonDTO[]> {
    if (this.repository.isExpired) {
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
  public getPokemon(url: string): Promise<any> {
    return fetch(url).then((response) => response.json());
  }
}
