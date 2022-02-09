import { IPokemonAbilitySummary, IAbilityData } from "../interfaces/PokemonData";
import {
  AbilityConstructorOptions, AbilityDTO
} from "../DataTransferObjects/AbilityDTO";

export class AbilityFactory {
  public createAbilityFromStub = 
    (stubData: IPokemonAbilitySummary): AbilityDTO => {
    const opts: AbilityConstructorOptions = {
      name: stubData.ability.name,
      url: stubData.ability.url,
    };

    return new AbilityDTO(opts, stubData.is_hidden);
  };

  public createAbilityFromData = 
    (abilityData: IAbilityData, isHidden: boolean): AbilityDTO => {
    const opts: AbilityConstructorOptions = {
      name: abilityData.name,
      id: abilityData.id,
      url: abilityData.url,
      effect: abilityData.effect,
      pokemons: abilityData.pokemons,
    };

    return new AbilityDTO(opts, isHidden);
  };
}
