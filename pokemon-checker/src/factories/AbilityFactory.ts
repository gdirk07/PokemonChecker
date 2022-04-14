import { IAbilityData, IAbilityStub } from "../interfaces/PokemonData";
import {
  AbilityConstructorOptions,
  AbilityDTO,
} from "../DataTransferObjects/AbilityDTO";

type AbilityDetails = {
  name: string;
  url: string;
  id: number;
  desc: string;
  pokemonHave: [];
  localizedName: string;
};

export class AbilityFactory {
  public createAbilityStub = (stubData: IAbilityStub): AbilityDTO => {
    const opts: AbilityConstructorOptions = {
      name: stubData.name,
      url: stubData.url,
    };

    return new AbilityDTO(opts);
  };

  public createAbilityFromDataAndStub = (
    abilityData: IAbilityData,
    stub: AbilityDTO
  ): AbilityDTO => {
    const fullAbility: AbilityDetails = this.cleanRetrievedData(
      abilityData,
      stub
    );

    stub.effect = fullAbility.desc;
    stub.pokemons = fullAbility.pokemonHave;
    stub.id = fullAbility.id;
    stub.localizedName = fullAbility.localizedName;
    return stub;
  };

  /**
   * Clean the response and add in the list of pokemon and english descripton
   * In a future milestone if we wanted to add
   * additional languages this would need to be expanded upon
   * @param response
   * @param ability
   * @returns
   */
  public cleanRetrievedData = (data: any, stub: AbilityDTO): AbilityDetails => {
    const cleanedData: AbilityDetails = {
      name: stub.name,
      url: stub.url,
      id: data.id,
      desc: "Missing Effect Description",
      pokemonHave: [],
      localizedName: "",
    };

    data.effect_entries.forEach((effect: any) => {
      if (effect.language.name === "en" && effect.short_effect)
        cleanedData.desc = effect.short_effect;
      else if (effect.language.name === "en" && effect.effect)
        cleanedData.desc = effect.effect;
    });
    cleanedData.pokemonHave = data.pokemon;
    //default option, just use the stub name
    cleanedData.localizedName =
      this.findLocalizedName("en", data.names) ?? stub.name;
    return cleanedData;
  };

  /**
   * Find the localized name for the ability
   * @param language the given language
   * todo: make a global map for how we define language vs the API
   * @param data the fetched data
   * @returns the localized name if found otherwise null
   * (which will default to the object name)
   */
  private findLocalizedName = (language: string, data: any): string | null => {
    for (const value of data) {
      if (value.language.name === "en") return value.name;
    }
    return null;
  };
}
