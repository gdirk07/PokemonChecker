import { PokemonRepository } from "../repositories/PokemonRepository";

/**
 * Service for handling fetches related to Pokemon, from
 * name/url stubs to full Pokemon DTO data.
 */

export class PokemonService {
  private getAllUrl: string;
  private repository: PokemonRepository;

  constructor() {
    this.getAllUrl = "https://pokeapi.co/api/v2/pokemon?limit=1000offset=0";
    this.repository = new PokemonRepository();
  }

  /**
   * Search ALL pokemon with their name and individual url
   * @TODO The promise type shold not be 'any', but changing it causes upstream
   * errors in the App.tsx
   */
  public getAllPokemon(): Promise<any> {
    return fetch(this.getAllUrl).then((response) => {
      return response.json().then((data) => {
        const results = data.results;

        //the query fetches all pokemon AND forms (megas etc), but we don't want
        //forms so filter out any result that has a url > 10000
        const filterResults = results.filter(
          (filter: { name: string; url: string }) => {
            //cut the final "/" out
            const url = filter.url
              .substring(0, filter.url.length - 1)
              .split("/");

            const id = Number(url.pop());
            if (id && id < 10000) return filter;
            return false;
          }
        );
        // Perform the DTO validation here, return
        console.log(filterResults);
        return filterResults;
      });
    });
  }

  /**
   * Lookup an individual pokemon
   * @param url the url for the specific pokemon
   */
  public getPokemon(url: string): Promise<any> {
    return fetch(url).then((response) => response.json());
  }
}
