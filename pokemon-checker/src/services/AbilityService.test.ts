import { AbilityService } from "./AbilityService";
import { pressureAbility } from "../_stubs/AbilityData";
import AbilityDTO from "../DataTransferObjects/AbilityDTO";

const serv: AbilityService = new AbilityService();
let testAbility: AbilityDTO = new AbilityDTO(pressureAbility);
let fetchedAbility: AbilityDTO;

beforeAll(async () => {
  fetchedAbility = await serv.getFullAbilityDef(testAbility);
});

test("Test service fetches from all data from API", () => {
  expect(fetchedAbility.hasFullData).toBe(true);
});

test("Test name fetched properly", () => {
  expect(fetchedAbility.name).toBe(pressureAbility.name);
});

test("Test url fetched properly", () => {
  expect(fetchedAbility.url).toBe(pressureAbility.url);
});

test("Test id fetched properly", () => {
  expect(fetchedAbility.id).toBe(pressureAbility.id);
});

test("Test effect fetched properly", () => {
  expect(fetchedAbility.effect).toBe(pressureAbility.effect);
});

test("Test pokemonList fetched properly", () => {
  expect(fetchedAbility.id).toEqual(pressureAbility.id);
  expect(fetchedAbility.url).toEqual(pressureAbility.url);
  expect(fetchedAbility.name).toEqual(pressureAbility.name);
});

test("Test localized ability name fetched properly", () => {
  expect(fetchedAbility.localizedName).toBe(pressureAbility.localizedName);
});

//mock browser data and test if AbilityService is actually storying/retrieving from localstorage
