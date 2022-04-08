import { AbilityDTO, AbilityConstructorOptions } from "./AbilityDTO";

test("Test creation of am ability from stub", () => {
  const abilityStub: AbilityConstructorOptions = {
    name: "dummy ability",
    url: "https://test.test"
  }

  const testAbility = new AbilityDTO(abilityStub);

  expect(testAbility.name).toBe("dummy ability");
  expect(testAbility.url).toBe("https://test.test");
});