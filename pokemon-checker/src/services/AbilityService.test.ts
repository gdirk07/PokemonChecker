import { AbilityService } from "./AbilityService";
import { pressureAbility } from "../_stubs/AbilityData";
import AbilityDTO from "../DataTransferObjects/AbilityDTO";

let serv: AbilityService;
let testAbility: AbilityDTO = new AbilityDTO(pressureAbility);
let fetchedAbility: AbilityDTO;

beforeAll(async () => {
  serv = new AbilityService();
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
  expect(fetchedAbility.pokemons).toEqual(pressureAbility.pokemons);
});

//mock browser data and test if AbilityService is actually storying/retrieving from localstorage
