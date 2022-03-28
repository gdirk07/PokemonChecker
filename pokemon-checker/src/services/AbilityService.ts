
import { AbilityDTO } from "../DataTransferObjects/AbilityDTO";
import { AbilityFactory } from "../factories/AbilityFactory";
import { IAbilityStub, IPokemonAbilitySummary } from "../interfaces/PokemonData";

/**
 * Service for handling fetches related to Abilities, and
 * their descriptions
 */
export class AbilityService {

  private factory: AbilityFactory;
  //create ability repository

  constructor() {
    this.factory = new AbilityFactory();
  }

  public getStub(ability: IPokemonAbilitySummary): AbilityDTO {
    //check repository
    const abilityDet: IAbilityStub = ability.ability;
    const abilityStub 
      = this.factory.createAbilityStub(abilityDet, ability.is_hidden);
    return abilityStub
  }

  public getFullAbilityDef(
    ability: AbilityDTO
  ): Promise<AbilityDTO> {
    return(
     fetch(ability.url)
      .then((retrievedAbility) => 
        this.resolveAbilityStub(
          retrievedAbility, 
          ability
        )
      )
    );
  }

  private resolveAbilityStub = async (
    response: Response,
    stub: AbilityDTO,
  ): Promise<AbilityDTO> => {
    const data = await response.json();
    return this.factory.createAbilityFromDataAndStub(data, stub);
  }
}