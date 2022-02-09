export type ListOfPokemon = {
  name: string;
  url: string;
}

export type AbilityConstructorOptions = {
  name: string,
  url: string,
  id?: number,
  effect?: string,
  pokemons?: ListOfPokemon[],
}

export class AbilityDTO {
  public name: string;
  public url;
  public id: number;
  public effect: string;
  public pokemons: ListOfPokemon[];
  public isHidden: boolean;
  
  constructor(
    AbilityConstructorOptions: AbilityConstructorOptions, 
    hidden: boolean
  ) {
    this.name = AbilityConstructorOptions.name;
    this.url = AbilityConstructorOptions.url;
    this.id = AbilityConstructorOptions.id ?? -1;
    this.effect = AbilityConstructorOptions.effect ?? "test effect";
    this.pokemons = AbilityConstructorOptions.pokemons ?? [];
    this.isHidden = hidden;
  }


}