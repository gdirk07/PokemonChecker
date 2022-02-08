import {statDisplayColour, pokemonStats} from "./StatDisplay";

test("Proper colour style of stat", () => {
  const stats = {
    stats: {
      hp: 50,
      attack: 150,
      defense: 1,
      spAttack: 350,
      spDefense: -40,
      speed: 85,
    },
  }
  expect(statDisplayColour(stats.stats.hp)).toBe("#ffa500");
  expect(statDisplayColour(stats.stats.attack)).toBe("#00ff00");
  expect(statDisplayColour(stats.stats.defense)).toBe("#ff0000");
});