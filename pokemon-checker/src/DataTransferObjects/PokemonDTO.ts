type PokemonConstructorOptions = {
  name: string;
  id: number;
  types: { type: { name: string } }[];
  moves: { name: string; url: string }[];
  sprites: { front_shiny: string; front_default: string };
};

type PokemonSpeciesConstructorOptions = {
  varieties: { name: string; url: string }[];
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
  public moves:{ name: string; url: string }[]; //TODO: Update this to a moveDTO[] object when created
  public frontDefault: string;
  public frontShiny: string;
  public alternateForms: { name: string; url: string }[] | null; //Mega, attack-type etc...

  constructor(
    pokemonConstructorOptions: PokemonConstructorOptions, 
    PokemonSpeciesConstructorOptions: PokemonSpeciesConstructorOptions
  ) 
  {
    this.name = pokemonConstructorOptions.name;
    this.dexId = pokemonConstructorOptions.id;
    this.moves = pokemonConstructorOptions.moves;
    this.type1 = pokemonConstructorOptions.types[0].type.name;
    this.type2 = pokemonConstructorOptions.types[1]
      ? pokemonConstructorOptions.types[1].type.name
      : null;
    this.frontDefault = pokemonConstructorOptions.sprites.front_default;
    this.frontShiny = pokemonConstructorOptions.sprites.front_shiny;
    // First item is the pokemon itself so remove it
    this.alternateForms 
      = PokemonSpeciesConstructorOptions.varieties.length > 1 ? 
        PokemonSpeciesConstructorOptions.varieties.slice(1) :
        null;
  }
}

export default PokemonDTO;
