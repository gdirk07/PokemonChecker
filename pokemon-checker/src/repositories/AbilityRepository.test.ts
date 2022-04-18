import { AbilityRepository } from "./AbilityRepository";
import { pressureAbility } from "../_stubs/AbilityData";

const repo: AbilityRepository = new AbilityRepository();

beforeAll(() => {
  repo.setAbilityData(pressureAbility);
});

test("Test creation of a repository item", () => {
  expect(repo.getAbility(pressureAbility.name)).toBe(pressureAbility);
});

test("Test expiry function not expired", () => {
  expect(repo.isExpired(pressureAbility.name)).toBe(false);
});

test("Test expiry object after expired", () => {
  repo.setAbilityData(pressureAbility, 0);
  expect(repo.isExpired(pressureAbility.name)).toBe(true);
});
