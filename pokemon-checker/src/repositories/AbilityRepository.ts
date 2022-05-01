import AbilityDTO from "../DataTransferObjects/AbilityDTO";
import { TimeService } from "../services/TimeService"
import { AbilityFactory } from "../factories/AbilityFactory";

type storageData = {
  ability: AbilityDTO;
  expiry: number;
};
export class AbilityRepository {
  private abilityTable: Record<string, storageData>;
  private factory: AbilityFactory;
  private timeService: TimeService;

  constructor() {
    this.abilityTable = {};
    this.factory = new AbilityFactory();
    this.timeService = new TimeService();
  }

  public getAbility(name: string): AbilityDTO | null {
    if (this.abilityTable[name]) return this.abilityTable[name].ability;
    return null;
  }

  /**
   * Saves the state of the current table to localStorage
   */
  public saveAbility(): void {
    localStorage.setItem("abilityTable", JSON.stringify(this.abilityTable));
  }

  /**
   * Assigns a full ability data payload to the repository
   * @param data Ability to write to repository
   * @param expire Defaults to 1h. Determines how long this data is valid
   */
  public setAbilityData(
    data: AbilityDTO,
    expire = this.timeService.generateExpiryTimestamp()
  ): void {
    const item: storageData = {
      ability: data,
      expiry: expire,
    };
    this.abilityTable[data.name] = item;
  }

  /**
   * Determines whether the expiry timestamp has passed
   */
  public isExpired(ability: string): boolean {
    const now = new Date();
    const foundAbility = this.abilityTable[ability];
    if (foundAbility && foundAbility.expiry < now.getTime()) return true;
    return false;
  }

  public loadFromStorage(): void {
    const savedData = localStorage.getItem("abilityTable");
    if (savedData) {
      const oldTable = JSON.parse(savedData);
      Object.keys(oldTable).forEach((key) => {
        const abilityData = this.factory.createAbilityStub(oldTable[key]);
        this.setAbilityData(abilityData);
      });
    }
  }
}
