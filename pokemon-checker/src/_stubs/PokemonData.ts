import {
  
  PokemonConstructorOptions,
} from "../DataTransferObjects/PokemonDTO";
import { MoveDTO } from "../DataTransferObjects/MoveDTO";
import { ElementType } from "../constants/ElementTypes";

/**
 * Input object for creating a pokemon DTO
 */
export const heraConstructorOpts: PokemonConstructorOptions = {
  id: 214,
  moves: [
    new MoveDTO({
      name: "swords-dance",
      url: "https://pokeapi.co/api/v2/move/14/",
    }),
  ],
  name: "heracross",
  sprites: {
    back_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/214.png",
    back_female:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/214.png",
    back_shiny:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/214.png",
    back_shiny_female:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/214.png",
    front_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/214.png",
    front_female:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/214.png",
    front_shiny:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/214.png",
    front_shiny_female:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/214.png",
    other: {},
    versions: {},
  },
  stats: [
    {
      base_stat: 80, // HP
    },
    {
      base_stat: 125, // ATK
    },
    {
      base_stat: 75, // DEF
    },
    {
      base_stat: 40, // SPA
    },
    {
      base_stat: 95, // SPD
    },
    {
      base_stat: 85, // SPE
    },
  ],
  types: [
    { name: ElementType.BUG, url: "https://pokeapi.co/api/v2/type/7/" },
    { name: ElementType.FIGHTING, url: "https://pokeapi.co/api/v2/type/2/" },
  ],
};

/**
 * Supporting data needed to generate from a stub
 * @param pokemonName The name of the pokemon
 * @param pokemonUrl String for the full lookup of the pokemon
 */
export const getEmptyPokemonOpts = (
  pokemonName: string,
  pokemonUrl: string
): PokemonConstructorOptions => ({
  name: pokemonName,
  id: -1,
  types: [
    {
      name: ElementType.BUG,
      url: "https://pokeapi.co/api/v2/type/7/",
    },
  ],
  sprites: {
    back_default: null,
    back_female: null,
    back_shiny: null,
    back_shiny_female: null,
    front_default: "",
    front_female: null,
    front_shiny: "",
    front_shiny_female: null,
    other: {},
    versions: {},
  },
  moves: [],
  stats: [
    { base_stat: 0 },
    { base_stat: 0 },
    { base_stat: 0 },
    { base_stat: 0 },
    { base_stat: 0 },
    { base_stat: 0 },
  ],
  url: pokemonUrl,
});
