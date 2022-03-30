
import { AbilityDTO } from "../DataTransferObjects/AbilityDTO";
import { AbilityFactory } from "../factories/AbilityFactory";
import { AbilityRepository } from "../repositories/AbilityRepository";
import { IAbilityStub, IPokemonAbilitySummary } from "../interfaces/PokemonData";

/**
 * Service for handling fetches related to Abilities, and
 * their descriptions
 */
export class AbilityService {

  private factory: AbilityFactory;
  //create ability repository
  private repository: AbilityRepository;
  constructor() {
    this.factory = new AbilityFactory();
    this.repository = new AbilityRepository();
  }

  /**
   * Fills the repository with skeleton DTOs and URLs,
   * assigning a timestamp in the process.
   * @param payload List of pokemon to store in the repository
   */
  private updateAbilityTable(payload: AbilityDTO): void {
    try{
      // Save the ability data to localStorage
      this.repository.setAbilityData(payload);
      this.repository.saveAbility();

      // Set the timestamp for 30 minutes
      this.repository.setExpiryTimestamp(30);
    }
    catch (e: unknown) {
      if (typeof e === 'string') {
        console.log(`Could not store ability stubs: ${e}`);
      }
      else if (e instanceof Error) {
        console.log(`Failed to store ability stub: ${e.message}`);
      }
      else {
        console.log(`Unknown error storing ability stubs: ${e}`);
      }
    }
  }

  public createAbilityFromStub(ability: IPokemonAbilitySummary): AbilityDTO {
    //check repository
    const repResult = this.repositoryLookup(ability.ability.name);
    if (repResult) return repResult;

    const abilityDet: IAbilityStub = ability.ability;
    const abilityStub 
      = this.factory.createAbilityStub(abilityDet);

    return abilityStub
  }

  public getFullAbilityDef(
    ability: AbilityDTO
  ): Promise<AbilityDTO> {
    const repResult = this.repositoryLookup(ability.name);
    if (repResult && repResult.hasFullData) return Promise.resolve(repResult);

    return(
      fetch(ability.url).then((retrievedAbility) => 
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
    const fullDetailedAbility 
      = this.factory.createAbilityFromDataAndStub(data, stub);
    this.updateAbilityTable(fullDetailedAbility);
    return fullDetailedAbility;
  }

  /**
   * Helper function for a quick repository lookup 
   * @param key 
   * @returns either the retrieved ability or nothing
   */
  private repositoryLookup(key: string): AbilityDTO | undefined {
    if (!(this.repository.isExpired)) {
      this.repository.loadFromStorage();
      const findAbility = this.repository.getAbility(key);
      if (findAbility) return findAbility;
    }
  }
}