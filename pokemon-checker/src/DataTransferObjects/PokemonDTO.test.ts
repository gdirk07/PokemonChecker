import { IPokemonStub } from "../interfaces/PokemonData";
import PokemonDTO from "./PokemonDTO";
import {
  heraConstructorOpts,
  getEmptyPokemonOpts,
} from "../_stubs/PokemonData";

test("Test creation of a pokemon stub", () => {
  const testStub: IPokemonStub = {
    name: "testMon",
    url: "https://test.test/",
  };

  const opts = getEmptyPokemonOpts(testStub.name, testStub.url);

  const testPokemon = new PokemonDTO(opts);

  expect(testPokemon.name).toBe("testMon");
  expect(testPokemon.url).toBe("https://test.test/");
  expect(testPokemon.hasFullData).toBe(false);
  expect(testPokemon.hasUrl).toBe(true);
});

test("Test creation of a valid pokemon object", () => {
  const testPokemon = new PokemonDTO(heraConstructorOpts);

  expect(testPokemon.name).toBe("heracross");
  expect(testPokemon.url).toBe("");
  expect(testPokemon.stats.hp).toBe(80);
  expect(testPokemon.hasFullData).toBe(true);
  expect(testPokemon.hasUrl).toBe(false);
});
