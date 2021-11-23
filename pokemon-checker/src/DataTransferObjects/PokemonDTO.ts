import { MoveDTO } from "./MoveDTO";
import { ITypeData, ISpriteData } from "../interfaces/PokemonData";

export type PokemonConstructorOptions = {
  name: string;
  id: number;
  types: ITypeData[];
  moves: MoveDTO[];
  sprites: ISpriteData;
  stats: {
    base_stat: number;
  }[];
  url?: string;
};

export type pokemonDisplayObj = {
  name?: string;
  id?: string;
  moves?: string[];
  type1?: string;
  type2?: string | null;
  sprites?: {
    frontDefault: string;
    frontShiny: string;
  };
};

export enum ElementType {
  BUG = "bug",
  DARK = "dark",
  DRAGON = "dragon",
  ELECTRIC = "electric",
  FAIRY = "fairy",
  FIGHTING = "fighting",
  FIRE = "fire",
  FLYING = "flying",
  GHOST = "ghost",
  GRASS = "grass",
  GROUND = "ground",
  ICE = "ice",
  NORMAL = "normal",
  POISON = "poison",
  PSYCHIC = "psychic",
  ROCK = "rock",
  STEEL = "steel",
  WATER = "water",
}

/**
 * Pokemon stat data is (currently) sent in an array where
 * stat indices are consistent with this enum
 */
enum pokemonStatIndex {
  HP,
  ATK,
  DEF,
  SPA,
  SPD,
  SPE,
}

/**
 * Pokemon Data Transfer Object
 *
 * Stores all important information related to a pokemon for in-app retrieval
 */
class PokemonDTO {
  public name: string;
  public dexId: number;
  public type1: string; //TODO: Update this to a TypeDTO object when created
  public type2: string | null;
  public moves: MoveDTO[];
  public frontDefault: string;
  public frontShiny: string;
  public stats: {
    hp: number;
    attack: number;
    defense: number;
    spAttack: number;
    spDefense: number;
    speed: number;
  };
  public baseStats: number; //A cumulation of the values of the 6 stats
  public url: string;

  constructor(pokemonConstructorOptions: PokemonConstructorOptions) {
    const stats = pokemonConstructorOptions.stats;
    const s = pokemonStatIndex;

    this.name = pokemonConstructorOptions.name;
    this.dexId = pokemonConstructorOptions.id;
    this.moves = pokemonConstructorOptions.moves;
    this.type1 = pokemonConstructorOptions.types[0].name ?? "";
    this.type2 = pokemonConstructorOptions.types[1]
      ? pokemonConstructorOptions.types[1].name
      : null;
    this.frontDefault = pokemonConstructorOptions.sprites.front_default;
    this.frontShiny = pokemonConstructorOptions.sprites.front_shiny;
    this.url = pokemonConstructorOptions.url ?? "";

    // ! Current stat generation relies on the consistency of the API
    this.stats = {
      hp: stats[s.HP].base_stat,
      attack: stats[s.ATK].base_stat,
      defense: stats[s.DEF].base_stat,
      spAttack: stats[s.SPA].base_stat,
      spDefense: stats[s.SPD].base_stat,
      speed: stats[s.SPE].base_stat,
    };
    this.baseStats = this.calculateBaseStats();
  }

  /**
   * Returns Pokemon data in consumable form (strings) for a calling view.
   */
  public getDisplayStats(): pokemonDisplayObj {
    return {
      name: this.name,
      id: this.dexId.toString(),
      moves: this.moves.map((moveEntry) => moveEntry.name),
      type1: this.type1,
      type2: this.type2,
      sprites: {
        frontDefault: this.frontDefault,
        frontShiny: this.frontShiny,
      },
    };
  }

  /**
   * Determines whether this PokemonDTO is suitable for rendering
   */
  public get hasFullData(): boolean {
    return (
      this.name.length > 0 &&
      this.dexId > 0 &&
      this.moves.length > 0 &&
      this.frontDefault.length > 0 &&
      this.frontShiny.length > 0
    );
  }

  /**
   * Flag showing if this DTO has the URL for its full data
   */
  public get hasUrl(): boolean {
    return this.url.length > 0;
  }

  /**
   * Calculates the 'base stat total' (BST) for this Pokemon.
   */
  private calculateBaseStats(): number {
    if (this.stats) {
      const s = this.stats;
      return s.hp + s.attack + s.defense + s.spAttack + s.spDefense + s.speed;
    }
    return 0;
  }
}

export default PokemonDTO;
