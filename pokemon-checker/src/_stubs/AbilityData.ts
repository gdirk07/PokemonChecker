import AbilityDTO from "../DataTransferObjects/AbilityDTO";

export const pressureCon = {
  name: "pressure",
  url: "https://pokeapi.co/api/v2/ability/pressure",
  id: 46,
  localizedName: "Pressure",
  effect: "Increases the PP cost of moves targetting the Pokémon by one.",
  effect_entries: [
    {
      effect:
        "Moves targetting this Pokémon use one extra PP.\\n\\nThis ability stacks if multiple targets have it.  This ability still affects moves that fail or miss.  This ability does not affect ally moves that target either the entire field or just its side, nor this Pokémon's self-targetted moves; it does, however, affect single-targetted ally moves aimed at this Pokémon, ally moves that target all other Pokémon, and opponents' moves that target the entire field.  If this ability raises a move's PP cost above its remaining PP, it will use all remaining PP.\\n\\nWhen this Pokémon enters battle, all participating trainers are notified that it has this ability.\\n\\nOverworld: If the lead Pokémon has this ability, higher-levelled Pokémon have their encounter rate increased.",
      language: { name: "en" },
      short_effect:
        "Increases the PP cost of moves targetting the Pokémon by one.",
    },
  ],
  names: [{ language: { name: "en" }, name: "Pressure" }],
  pokemons: [
    {
      is_hidden: false,
      pokemon: {
        name: "aerodactyl",
        url: "https://pokeapi.co/api/v2/pokemon/142/",
      },
      slot: 2,
    },
    {
      is_hidden: false,
      pokemon: {
        name: "articuno",
        url: "https://pokeapi.co/api/v2/pokemon/144/",
      },
      slot: 1,
    },
    {
      is_hidden: false,
      pokemon: {
        name: "zapdos",
        url: "https://pokeapi.co/api/v2/pokemon/145/",
      },
      slot: 1,
    },
    {
      is_hidden: false,
      pokemon: {
        name: "moltres",
        url: "https://pokeapi.co/api/v2/pokemon/146/",
      },
      slot: 1,
    },
    {
      is_hidden: false,
      pokemon: {
        name: "mewtwo",
        url: "https://pokeapi.co/api/v2/pokemon/150/",
      },
      slot: 1,
    },
    {
      is_hidden: false,
      pokemon: {
        name: "raikou",
        url: "https://pokeapi.co/api/v2/pokemon/243/",
      },
      slot: 1,
    },
    {
      is_hidden: false,
      pokemon: { name: "entei", url: "https://pokeapi.co/api/v2/pokemon/244/" },
      slot: 1,
    },
    {
      is_hidden: false,
      pokemon: {
        name: "suicune",
        url: "https://pokeapi.co/api/v2/pokemon/245/",
      },
      slot: 1,
    },
    {
      is_hidden: false,
      pokemon: { name: "lugia", url: "https://pokeapi.co/api/v2/pokemon/249/" },
      slot: 1,
    },
    {
      is_hidden: false,
      pokemon: { name: "ho-oh", url: "https://pokeapi.co/api/v2/pokemon/250/" },
      slot: 1,
    },
    {
      is_hidden: true,
      pokemon: {
        name: "wailmer",
        url: "https://pokeapi.co/api/v2/pokemon/320/",
      },
      slot: 3,
    },
    {
      is_hidden: true,
      pokemon: {
        name: "wailord",
        url: "https://pokeapi.co/api/v2/pokemon/321/",
      },
      slot: 3,
    },
    {
      is_hidden: false,
      pokemon: {
        name: "dusclops",
        url: "https://pokeapi.co/api/v2/pokemon/356/",
      },
      slot: 1,
    },
    {
      is_hidden: false,
      pokemon: { name: "absol", url: "https://pokeapi.co/api/v2/pokemon/359/" },
      slot: 1,
    },
    {
      is_hidden: false,
      pokemon: {
        name: "deoxys-normal",
        url: "https://pokeapi.co/api/v2/pokemon/386/",
      },
      slot: 1,
    },
    {
      is_hidden: false,
      pokemon: {
        name: "vespiquen",
        url: "https://pokeapi.co/api/v2/pokemon/416/",
      },
      slot: 1,
    },
    {
      is_hidden: false,
      pokemon: {
        name: "spiritomb",
        url: "https://pokeapi.co/api/v2/pokemon/442/",
      },
      slot: 1,
    },
    {
      is_hidden: false,
      pokemon: {
        name: "weavile",
        url: "https://pokeapi.co/api/v2/pokemon/461/",
      },
      slot: 1,
    },
    {
      is_hidden: false,
      pokemon: {
        name: "dusknoir",
        url: "https://pokeapi.co/api/v2/pokemon/477/",
      },
      slot: 1,
    },
    {
      is_hidden: false,
      pokemon: {
        name: "dialga",
        url: "https://pokeapi.co/api/v2/pokemon/483/",
      },
      slot: 1,
    },
    {
      is_hidden: false,
      pokemon: {
        name: "palkia",
        url: "https://pokeapi.co/api/v2/pokemon/484/",
      },
      slot: 1,
    },
    {
      is_hidden: false,
      pokemon: {
        name: "giratina-altered",
        url: "https://pokeapi.co/api/v2/pokemon/487/",
      },
      slot: 1,
    },
    {
      is_hidden: true,
      pokemon: {
        name: "pawniard",
        url: "https://pokeapi.co/api/v2/pokemon/624/",
      },
      slot: 3,
    },
    {
      is_hidden: true,
      pokemon: {
        name: "bisharp",
        url: "https://pokeapi.co/api/v2/pokemon/625/",
      },
      slot: 3,
    },
    {
      is_hidden: false,
      pokemon: {
        name: "kyurem",
        url: "https://pokeapi.co/api/v2/pokemon/646/",
      },
      slot: 1,
    },
    {
      is_hidden: false,
      pokemon: {
        name: "corviknight",
        url: "https://pokeapi.co/api/v2/pokemon/823/",
      },
      slot: 1,
    },
    {
      is_hidden: false,
      pokemon: {
        name: "eternatus",
        url: "https://pokeapi.co/api/v2/pokemon/890/",
      },
      slot: 1,
    },
    {
      is_hidden: false,
      pokemon: {
        name: "deoxys-attack",
        url: "https://pokeapi.co/api/v2/pokemon/10001/",
      },
      slot: 1,
    },
    {
      is_hidden: false,
      pokemon: {
        name: "deoxys-defense",
        url: "https://pokeapi.co/api/v2/pokemon/10002/",
      },
      slot: 1,
    },
    {
      is_hidden: false,
      pokemon: {
        name: "deoxys-speed",
        url: "https://pokeapi.co/api/v2/pokemon/10003/",
      },
      slot: 1,
    },
    {
      is_hidden: false,
      pokemon: {
        name: "eternatus-eternamax",
        url: "https://pokeapi.co/api/v2/pokemon/10190/",
      },
      slot: 1,
    },
    {
      is_hidden: false,
      pokemon: {
        name: "corviknight-gmax",
        url: "https://pokeapi.co/api/v2/pokemon/10212/",
      },
      slot: 1,
    },
  ],
};
export const pressureAbility: AbilityDTO = new AbilityDTO(pressureCon);
