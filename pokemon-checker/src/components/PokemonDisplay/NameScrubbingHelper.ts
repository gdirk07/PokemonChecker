import { HyphenInName, PeriodInName, GenderInName, apostrapheInName, diacriticInName, colonInName } from "./NameException";

/**
 * scrubber for pokemon names which will fix the api errors for namings
 * @param pokemonName The name of the pokemon given by the api
 * @returns The correct name of the pokemon
 */
export function scrubPokemonName(pokemonName: string): string {
  if (pokemonName in PeriodInName) return PeriodInName[pokemonName];
  if (pokemonName in GenderInName) return GenderInName[pokemonName];
  if (pokemonName in apostrapheInName) return apostrapheInName[pokemonName];
  if (pokemonName in diacriticInName) return diacriticInName[pokemonName];
  if (pokemonName in colonInName) return colonInName[pokemonName];
  if (pokemonName.includes("-") &&
    !HyphenInName.find(element => element === pokemonName)) {
      return pokemonNameCapitalizer(pokemonName.split("-")[0]);
    }
  else if (pokemonName.includes("-") &&
    HyphenInName.find(element => element === pokemonName)) {
      return pokemonNameCapitalizer(pokemonName, true);
    }
  return pokemonNameCapitalizer(pokemonName);
};

/**
 * Helper function to capitalize Pokemon names
 * Note: Export if needed outside this function
 * @param pokemonName Name of the pokemon
 * @param hyphen whether a hyphen exists as to capitalize the first 
 * letter following the hyphen
 * @returns the pokemon name with proper capitalizations
 */
function pokemonNameCapitalizer(pokemonName: string, hyphen?: boolean): string {
  if (!hyphen) {
    return pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
  }
  else {
    let name:string[] = pokemonName.split("-");
    return name[0].charAt(0).toUpperCase() + name[0].slice(1) + "-" +
      name[1].charAt(0).toUpperCase() + name[1].slice(1)
  }
}