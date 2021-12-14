import {
  IPokemonStub,
  ITypeData,
} from "../interfaces/PokemonData";
import PokemonDTO, {
  ElementType,
  PokemonConstructorOptions,
} from "./PokemonDTO";
import { MoveDTO } from "./MoveDTO";

test("Test creation of a pokemon stub", () => {
  const testStub: IPokemonStub = {
    name: "testMon",
    url: "https://test.test/",
  };

  const dummyType: ITypeData = {
    name: ElementType.BUG,
    url: "https://pokeapi.co/api/v2/type/7/",
  };
  const opts: PokemonConstructorOptions = {
    name: testStub.name,
    id: -1,
    types: [dummyType],
    sprites: {
      back_default: null,
      back_female: null,
      back_shiny: null,
      back_shiny_female: null,
      front_default: "",
      front_female: null,
      front_shiny: "",
      front_shiny_female: null,
      other: {},
      versions: {},
    },
    moves: [],
    stats: [
      { base_stat: 0 },
      { base_stat: 0 },
      { base_stat: 0 },
      { base_stat: 0 },
      { base_stat: 0 },
      { base_stat: 0 },
    ],
    url: testStub.url,
  };

  const testPokemon = new PokemonDTO(opts);

  expect(testPokemon.name).toBe("testMon");
  expect(testPokemon.url).toBe("https://test.test/");
  expect(testPokemon.hasFullData).toBe(false);
  expect(testPokemon.hasUrl).toBe(true);
});

test("Test creation of a valid pokemon object", () => {
  const heraStub: PokemonConstructorOptions = {
    id: 214,
    moves: [
      new MoveDTO({
        name: "swords-dance",
        url: "https://pokeapi.co/api/v2/move/14/",
      }),
    ],
    name: "heracross",
    sprites: {
      back_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/214.png",
      back_female:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/214.png",
      back_shiny:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/214.png",
      back_shiny_female:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/214.png",
      front_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/214.png",
      front_female:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/214.png",
      front_shiny:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/214.png",
      front_shiny_female:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/214.png",
      other: {},
      versions: {},
    },
    stats: [
      {
        base_stat: 80, // HP
      },
      {
        base_stat: 125, // ATK
      },
      {
        base_stat: 75, // DEF
      },
      {
        base_stat: 40, // SPA
      },
      {
        base_stat: 95, // SPD
      },
      {
        base_stat: 85, // SPE
      },
    ],
    types: [
      { name: ElementType.BUG, url: "https://pokeapi.co/api/v2/type/7/" },
      { name: ElementType.FIGHTING, url: "https://pokeapi.co/api/v2/type/2/" },
    ],
  };

  const testPokemon = new PokemonDTO(heraStub);

  expect(testPokemon.name).toBe("heracross");
  expect(testPokemon.url).toBe("");
  expect(testPokemon.stats.hp).toBe(80);
  expect(testPokemon.hasFullData).toBe(true);
  expect(testPokemon.hasUrl).toBe(false);
});
