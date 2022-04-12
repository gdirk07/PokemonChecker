import AbilityDTO from "../DataTransferObjects/AbilityDTO";
import { Time } from "../constants/Time";
import { AbilityFactory } from "../factories/AbilityFactory";

type storageData = {
  ability: AbilityDTO,
  expiry: number,
};
export class AbilityRepository {
  private abilityTable: Record<string, storageData>;
  private factory: AbilityFactory;

  // Used to check against localStorage
  private static storageTimestampKey = "expiryTimestamp";

  constructor() {
    this.abilityTable = {};
    this.factory = new AbilityFactory();
  }

  /**
   * Sets a time for which the repository data will become stale.
   * @param minutes Duration to set the repository expiry time.
   */
  public setExpiryTimestamp(minutes = 60): number {
    const newStamp =
      Date.now() +
      minutes * Time.MILLISECONDS_PER_SECOND * Time.SECONDS_PER_MINUTE;

    return newStamp;
  }

  public getAbility(name: string): AbilityDTO | null {
    if (this.abilityTable[name]) return this.abilityTable[name].ability
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
   */
  public setAbilityData(
    data: AbilityDTO, 
    expire: number = this.setExpiryTimestamp()
    ): void {
    const item: storageData = {
      ability: data,
      expiry: expire
    }
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
