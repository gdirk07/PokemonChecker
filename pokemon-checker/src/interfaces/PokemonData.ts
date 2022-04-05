import { damageClass } from "../DataTransferObjects/MoveDTO";
import { ListOfPokemon } from "../DataTransferObjects/AbilityDTO"
import { ElementType } from "../constants/ElementTypes";

/**
 * ===================================================================
 *                              MOVE DATA
 * ===================================================================
 */

/**
 * Raw object received with Pokemon data. Contains the name and a link.
 */
export interface IMoveStub {
  name: string;
  url: string;
}

export interface IAbilityStub {
  name: string;
  url: string;
}

/**
 * Dictates how a pokemon learns this move
 * e.g. 'machine', 'level-up', 'tutor'
 */
export interface IMoveLearnMethod {
  name: string;
  url: string;
}

/**
 * Contains a link to the move in different versions of the game
 * e.g. 'gold-silver', 'platinum', 'black-2-white-2'
 */
export interface IMoveVersionGroup {
  name: string;
  url: string;
}

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
export interface IPokemonStub {
  name: string;
  url: string;
}

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
};

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
