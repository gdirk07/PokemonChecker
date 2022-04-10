import { setDisplayColour } from "./StatDisplay";
import { statColourDisplay } from "../../../constants/StatThresholds";

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
  };
  expect(setDisplayColour(stats.stats.hp)).toBe(statColourDisplay.LOW);
  expect(setDisplayColour(stats.stats.attack)).toBe(statColourDisplay.GOOD);
  expect(setDisplayColour(stats.stats.defense)).toBe(statColourDisplay.VERYLOW);
  expect(setDisplayColour(stats.stats.spDefense)).toBe(
    statColourDisplay.VERYLOW
  ); //for now, a negative integer is valid
  expect(setDisplayColour(stats.stats.speed)).toBe(statColourDisplay.DECENT);
});
