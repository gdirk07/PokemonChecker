import { AbilityFactory } from "./AbilityFactory";
import { pressureAbility } from "../_stubs/AbilityData";
import { IAbilityData } from "../interfaces/PokemonData";
import AbilityDTO from "../DataTransferObjects/AbilityDTO";

const factory = new AbilityFactory();
const pressureStub = {
  name: pressureAbility.name,
  url: pressureAbility.url,
  id: -1,
  effect: "Missing Effect",
  pokemons: [],
  localizedName: pressureAbility.name,
};
let mockFull: AbilityDTO;
let apiRetrieved: IAbilityData;

beforeAll(async () => {
  apiRetrieved 
    = await fetch(pressureStub.url).then(retrieved => retrieved.json());
})

test("Can create stub ability", () => {
  const mockStub = factory.createAbilityStub(pressureStub)
  expect(mockStub).toEqual(pressureStub);
})

test("Can convert stub to full", () => {
  const mockStub = factory.createAbilityStub(pressureStub);
  mockFull = factory.createAbilityFromDataAndStub(apiRetrieved, mockStub);
  expect(mockFull).toEqual(pressureAbility);
})

//When we get into name localizations we can write test functions for that 