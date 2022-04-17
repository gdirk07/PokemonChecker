import AbilityDTO from "../DataTransferObjects/AbilityDTO";

const pressureCon = {
  name: "pressure",
  url: "https://pokeapi.co/api/v2/ability/pressure",
  id: 46,
  effect: "Increases the PP cost of moves targetting the Pokémon by one.",
  pokemons: [{ name: "Absol", url: "test" }],
};
export const pressureAbility: AbilityDTO = new AbilityDTO(pressureCon);
