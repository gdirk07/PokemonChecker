type PokemonConstructorOptions = {
  name: string;
  id: number;
  types: { type: { name: string } }[];
  moves: { name: string; url: string }[];
  sprites: { front_shiny: string; front_default: string };
  stats: {
    base_stat: number
  }[]
};

enum pokemonStatIndex {
  HP,
  ATK,
  DEF,
  SPA,
  SPD,
  SPE
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
  //TODO: Update this to a moveDTO[] object when created
  public moves:{ name: string; url: string }[];
  public frontDefault: string;
  public frontShiny: string;
  public stats: {
    hp: number,
    attack: number,
    defense: number,
    spAttack: number,
    spDefense: number,
    speed: number
  }
  public baseStats: number //A cumulation of the values of the 6 stats

  constructor(pokemonConstructorOptions: PokemonConstructorOptions) {
    const stats = pokemonConstructorOptions.stats;
    const s = pokemonStatIndex;

    this.name = pokemonConstructorOptions.name;
    this.dexId = pokemonConstructorOptions.id;
    this.moves = pokemonConstructorOptions.moves;
    this.type1 = pokemonConstructorOptions.types[0].type.name;
    this.type2 = pokemonConstructorOptions.types[1]
      ? pokemonConstructorOptions.types[1].type.name
      : null;
    this.frontDefault = pokemonConstructorOptions.sprites.front_default;
    this.frontShiny = pokemonConstructorOptions.sprites.front_shiny;

    //TODO: there has to be a more structured method, 
    //this relies on the consistency of the API to map.
    this.stats = {
      hp: stats[s.HP].base_stat,
      attack: stats[s.ATK].base_stat,
      defense: stats[s.DEF].base_stat,
      spAttack: stats[s.SPA].base_stat,
      spDefense: stats[s.SPD].base_stat,
      speed: stats[s.SPE].base_stat
    };
    this.baseStats = this.calculateBaseStats();
  }

  private calculateBaseStats(): number {
    if (this.stats)
    {
      const s = this.stats;
      return s.hp + s.attack + s.defense + s.spAttack + s.spDefense + s.speed;
    }
    return 0;
  }
}

export default PokemonDTO;
