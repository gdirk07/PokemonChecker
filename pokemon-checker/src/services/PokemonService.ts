/**
 * Service for handling fetches related to Pokemon
 * TODO: Flesh these out, keeping them separate for now as we will flesh them
 * out in the future
 */

/**
 * Search ALL pokemon with their name and individual url
 * @param url the url to fetch all pokemon for searching
 */
export const getAllPokemon = (url: string):Promise<any> => {
  return fetch(url).then((response) => {
    return response.json().then((data) => {
      // Perform the DTO validation here, return
      console.log(data);
      return data;
    });
  });
}

/**
 * Lookup an individual pokemon
 * @param url the url for the specific pokemon
 */
export const getSelectedPokemon = (url: string): Promise<any> => {
  return fetch(url).then((response) => response.json());
}
