import AbilityDTO from "../DataTransferObjects/AbilityDTO";
import { Time } from "../constants/Time";
import { AbilityFactory } from "../factories/AbilityFactory";

export class AbilityRepository {
  private abilityTable: Record<string, AbilityDTO>;
  private expiryTimestamp: number;
  private factory: AbilityFactory

  // Used to check against localStorage
  private static storageTimestampKey = "expiryTimestamp";

  constructor() {
    this.abilityTable = {};
    this.factory = new AbilityFactory();
    this.expiryTimestamp = this.initTimestamp();
  }

  /**
   * Returns the existing timestamp from localStorage, if it exists.
   * Zero indicates that localStorage is un-set
   */
   public initTimestamp(): number {
    const oldStamp = Number(
      localStorage.getItem(AbilityRepository.storageTimestampKey)
    );
    return oldStamp ?? 0;
  }

  /**
   * Sets a time for which the repository data will become stale.
   * @param minutes Duration to set the repository expiry time.
   */
  public setExpiryTimestamp(minutes = 60): void {
    const newStamp =
      Date.now() +
      minutes * Time.MILLISECONDS_PER_SECOND * Time.SECONDS_PER_MINUTE;

    localStorage.setItem(
      AbilityRepository.storageTimestampKey,
      newStamp.toString()
    );
  }

  public getAbility(name: string): AbilityDTO | null {
    return this.abilityTable[name];
  }

  /**
   * Saves the state of the current table to localStorage
   */
  public saveAbility(): void {
    localStorage.setItem('abilityTable', JSON.stringify(this.abilityTable));
  }

  /**
   * Assigns a full ability data payload to the repository
   * @param data Ability to write to repository
   */
  public setAbilityData(data: AbilityDTO): void {
    this.abilityTable[data.name] = data;
  }

  /**
   * Determines whether the expiry timestamp has passed
   */
  public get isExpired(): boolean {
    return this.expiryTimestamp < Date.now();
  }

  public loadFromStorage(): void {
    const savedData = localStorage.getItem('abilityTable');
    if (savedData) {
      const oldTable = JSON.parse(savedData);
      (Object.keys(oldTable)).forEach(key => {
        const abilityData = this.factory.createAbilityStub(oldTable[key]);
        this.setAbilityData(abilityData);
      });
    }
  }
}
