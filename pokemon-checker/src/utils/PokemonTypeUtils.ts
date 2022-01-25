import { ElementType } from "../constants/ElementTypes";

/**
 * Returns a pokemon ElementType based on an input string (lowercase).
 * @param inputType Raw string from API payload
*/
export const getTypeFromData = (inputType: string): ElementType => {
  switch (inputType) {
    case "bug":
      return ElementType.BUG;
    case "dark":
      return ElementType.DARK;
    case "dragon":
      return ElementType.DRAGON;
    case "electric":
      return ElementType.ELECTRIC;
    case "fairy":
      return ElementType.FAIRY;
    case "fighting":
      return ElementType.FIGHTING;
    case "fire":
      return ElementType.FIRE;
    case "flying":
      return ElementType.FLYING;
    case "ghost":
      return ElementType.GHOST;
    case "grass":
      return ElementType.GRASS;
    case "ground":
      return ElementType.GROUND;
    case "ice":
      return ElementType.ICE;
    case "normal":
      return ElementType.NORMAL;
    case "poison":
      return ElementType.POISON;
    case "psychic":
      return ElementType.PSYCHIC;
    case "rock":
      return ElementType.ROCK;
    case "steel":
      return ElementType.STEEL;
    case "water":
      return ElementType.WATER;
    default:
      return ElementType.NULL;
  }
}