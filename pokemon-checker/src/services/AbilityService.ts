import { AbilityFactory } from "../factories/AbilityFactory";

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

  public getAbility(url: string): Promise<any> {
    return fetch(url).then((response) => response.json());
  }
}