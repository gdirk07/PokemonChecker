import { IAbilityData, IAbilityStub } from "../interfaces/PokemonData";
import {
  AbilityConstructorOptions, AbilityDTO
} from "../DataTransferObjects/AbilityDTO";

type AbilityDetails = {
  name: string,
  url: string,
  id: number,
  desc: string,
  pokemonHave: [],
}

export class AbilityFactory {
  public createAbilityStub = 
    (stubData: IAbilityStub, hidden: boolean): AbilityDTO => {
    const opts: AbilityConstructorOptions = {
      name: stubData.name,
      url: stubData.url,
    };
    
    return new AbilityDTO(opts, hidden);
  };

  public createAbilityFromDataAndStub = 
    (
      abilityData: IAbilityData, 
      stub: AbilityDTO, 
    ): AbilityDTO => {
    const fullAbility: AbilityDetails 
      = this.cleanRetrievedData(abilityData, stub)

    stub.effect = fullAbility.desc;
    stub.pokemons = fullAbility.pokemonHave;
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
  public cleanRetrievedData = (data: any, stub: AbilityDTO) : AbilityDetails => {
    const cleanedData: AbilityDetails = {
      name: stub.name,
      url: stub.url,
      id: data.id,
      desc: "Missing Effect Description",
      pokemonHave: [],
    };

    data.effect_entries.forEach((effect: any) => {
      if (effect.language.name === "en" && effect.short_effect) 
        cleanedData.desc = effect.short_effect;
      else if (effect.language.name === "en" && effect.effect)
        cleanedData.desc = effect.effect;
      });
    cleanedData.pokemonHave=data.pokemon;
    return cleanedData;
  }
}
