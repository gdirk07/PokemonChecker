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
      const results = data.results;
      
      //the query fetches all pokemon AND forms (megas etc), but we don't want 
      //forms so filter out any result that has a url > 10000
      const filterResults = results.filter((filter: {
        name: string,
        url: string
      }) => {
        //cut the final "/" out
        const url = filter.url.substring(0, filter.url.length-1).split("/");

        const id = Number(url.pop());
        if (id && id < 10000) return filter
        return false;
      });
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
export const getSelectedPokemon = (url: string): Promise<any> => {
  return fetch(url).then((response) => response.json());
}
