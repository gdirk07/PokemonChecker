import { HYPHEN_IN_NAME, PERIOD_IN_NAME, GENDER_IN_NAME, 
  APOSTAPHE_IN_NAME, DIACRITIC_IN_NAME, COLON_IN_NAME 
} from "../constants/NameException";

/**
 * scrubber for pokemon names which will fix the api errors for namings
 * @param pokemonName The name of the pokemon given by the api
 * @returns The correct name of the pokemon
 */
export function scrubPokemonName(pokemonName: string): string {
  if (pokemonName in PERIOD_IN_NAME) return PERIOD_IN_NAME[pokemonName];
  if (pokemonName in GENDER_IN_NAME) return GENDER_IN_NAME[pokemonName];
  if (pokemonName in APOSTAPHE_IN_NAME) return APOSTAPHE_IN_NAME[pokemonName];
  if (pokemonName in DIACRITIC_IN_NAME) return DIACRITIC_IN_NAME[pokemonName];
  if (pokemonName in COLON_IN_NAME) return COLON_IN_NAME[pokemonName];
  if (pokemonName.includes("-") &&
    !HYPHEN_IN_NAME.find(element => element === pokemonName)) {
      return pokemonNameCapitalizer(pokemonName.split("-")[0]);
    }
  else if (pokemonName.includes("-") &&
    HYPHEN_IN_NAME.find(element => element === pokemonName)) {
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