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
  public moves:{ name: string; url: string }[]; //TODO: Update this to a moveDTO[] object when created
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
    this.name = pokemonConstructorOptions.name;
    this.dexId = pokemonConstructorOptions.id;
    this.moves = pokemonConstructorOptions.moves;
    this.type1 = pokemonConstructorOptions.types[0].type.name;
    this.type2 = pokemonConstructorOptions.types[1]
      ? pokemonConstructorOptions.types[1].type.name
      : null;
    this.frontDefault = pokemonConstructorOptions.sprites.front_default;
    this.frontShiny = pokemonConstructorOptions.sprites.front_shiny;

    //TODO: there has to be a more structured method, this relies on the consistency of the API to map.
    this.stats = {
      hp: pokemonConstructorOptions.stats[0].base_stat,
      attack: pokemonConstructorOptions.stats[1].base_stat,
      defense: pokemonConstructorOptions.stats[2].base_stat,
      spAttack: pokemonConstructorOptions.stats[3].base_stat,
      spDefense: pokemonConstructorOptions.stats[4].base_stat,
      speed: pokemonConstructorOptions.stats[5].base_stat
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
