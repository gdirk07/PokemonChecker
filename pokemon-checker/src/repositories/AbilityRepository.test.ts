import { AbilityRepository } from "./AbilityRepository";
import { pressureAbility } from "../_stubs/AbilityData";

let repo: AbilityRepository;
beforeAll(() => {
  repo = new AbilityRepository();
});

afterEach(() => {
  localStorage.clear();
});

test("Test creation of a repository item", () => {
  repo.setAbilityData(pressureAbility);
  expect(repo.getAbility(pressureAbility.name)).toBe(pressureAbility);
});

test("Test expiry function not expired", () => {
  repo.setAbilityData(pressureAbility);
  expect(repo.isExpired(pressureAbility.name)).toBe(false);
});

test("Test expiry object after expired", () => {
  repo.setAbilityData(pressureAbility, 0);
  expect(repo.isExpired(pressureAbility.name)).toBe(true);
});
