import { damageClass } from "../DataTransferObjects/MoveDTO";
import {
  AbilityRepoData,
  ListOfPokemon,
} from "../DataTransferObjects/AbilityDTO";
import { ElementType } from "../constants/ElementTypes";

/**
 * ===================================================================
 *                         Global Pokemon Stub
 *  Far as I can tell, all data coming from the API will come in the
 *             format of { name: string; url: string; }
 * ===================================================================
 */
export interface IPokeAPIStub {
  name: string;
  url: string;
}

/**
 * ===================================================================
 *                              MOVE DATA
 * ===================================================================
 */

/**
 * Raw objects received with Pokemon data. Contains the name and a link.
 */
export interface IMoveStub extends IPokeAPIStub {}
export interface IAbilityStub extends IPokeAPIStub {}

/**
 * Dictates how a pokemon learns this move
 * e.g. 'machine', 'level-up', 'tutor'
 */
export interface IMoveLearnMethod extends IPokeAPIStub {}

/**
 * Contains a link to the move in different versions of the game
 * e.g. 'gold-silver', 'platinum', 'black-2-white-2'
 */
export interface IMoveVersionGroup extends IPokeAPIStub {}

/**
 * Move acquisition metadata for each Pokemon version
 */
export interface IMoveVersion {
  level_learned_at: number;
  move_learn_method: IMoveLearnMethod;
  version_group: IMoveVersionGroup;
}

/**
 * Contains the move stub info, as well as all versions
 */
export interface IMoveSummary {
  move: IMoveStub;
  version_group_details: IMoveVersion[];
}

/**
 * Contains the Pokemon specific ability info
 */
export interface IPokemonAbilitySummary {
  ability: IAbilityStub;
  is_hidden: boolean;
}

/**
 * Full move DTO Partial
 */
export interface IMoveData {
  name: string;
  power: number;
  accuracy: number;
  damage_class: damageClass;
  description: string;
  pp: number;
  priority: number;
  type: { name: string; url: string };
  url: string;
}

/**
 * Restored DTO stub shape
 */
export interface IMoveRepoData {
  name: string;
  power: number;
  accuracy: number;
  damage_class: string;
  description: string;
  url: string;
}

/**
 * Full ability DTO Partial
 */
export interface IAbilityData {
  name: string;
  id: number;
  url: string;
  effect: string;
  pokemons: ListOfPokemon[];
}

/**
 * ===================================================================
 *                            POKEMON DATA
 * ===================================================================
 */

/**
 * Name and URL returned when querying Pokemon summary data
 */
export interface IPokemonStub extends IPokeAPIStub {}

/**
 * Type stub found on pokemon data
 */
export interface ITypeData {
  name: ElementType;
  url: string;
}

export interface ITypeSlot {
  slot: number;
  type: ITypeData;
}

/**
 * Sprite URLs attached to pokemon
 */
export interface ISpriteData {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
  other: any; // TODO: Populate this data
  versions: any;
}

/**
 * Stat DTOs included with pokemon
 * 
 * TODO: make a full, formal stat DTO that can return bases and totals
 */
export interface IStatData {
  base_stat: number;
  effort: number;
  stat: { name: string; url: string };
}

/**
 * Full DTO payload when requesting a pokmeon
 * TODO: Fill in missing stats (height, weight, base exp, etc.)
 */
export interface IPokemonData {
  name: string;
  id: number;
  types: ITypeSlot[];
  sprites: ISpriteData;
  moves: IMoveSummary[];
  abilities: IPokemonAbilitySummary[];
  stats: IStatData[];
}

/**
 * Raw JSON of an existing PokemonDTO
 * 
 * TODO: STAT DATA IS NOT REPRESENTED AS AN ARRAY AFTER STORAGE
 * {"hp":45,"attack":49,"defense":49,"spAttack":65,"spDefense":65,"speed":45}
 */
export interface IPokemonRepoData {
  name: string;
  baseStats: number;
  dexId: number;
  frontDefault: string;
  frontShiny: string;
  type1: string;
  type2: string;
  sprites: ISpriteData;
  moves: IMoveRepoData[];
  abilities: AbilityRepoData[];
  stats: IStatData[];
  url: string;
}
