export type ListOfPokemon = {
  name: string;
  url: string;
};

export type AbilityConstructorOptions = {
  name: string;
  url: string;
  id?: number;
  effect?: string;
  pokemons?: ListOfPokemon[];
  localizedName?: string;
};

export class AbilityDTO {
  public name: string;
  public url: string;
  public id: number;
  public effect: string;
  public pokemons: ListOfPokemon[];
  public localizedName: string;

  constructor(AbilityConstructorOptions: AbilityConstructorOptions) {
    this.name = AbilityConstructorOptions.name;
    this.url = AbilityConstructorOptions.url;
    this.id = AbilityConstructorOptions.id ?? -1;
    this.effect = AbilityConstructorOptions.effect ?? "Missing Effect";
    this.pokemons = AbilityConstructorOptions.pokemons ?? [];
    this.localizedName =
      AbilityConstructorOptions.localizedName ?? AbilityConstructorOptions.name;
  }

  public setDescription(effect: string) {
    this.effect = effect;
  }

  public setId(id: number) {
    this.id = id;
  }

  /**
   * Determines whether this AbilityDTO is suitable for rendering
   */
  public get hasFullData(): boolean {
    return (
      this.name.length > 0 &&
      this.url.length > 0 &&
      this.id > -1 &&
      this.effect.length > 0 &&
      this.localizedName.length > 0
    );
  }
}

export default AbilityDTO;
