import NameDisplay from "./DisplayFunctionalComponents/NameDisplay";
import StatDisplay from "./DisplayFunctionalComponents/StatDisplay";
import TypeDisplay from "./DisplayFunctionalComponents/TypeDisplay";
import PokemonImage from "./DisplayFunctionalComponents/PokemonImageDisplay";
import "./PokemonDisplayStyle.css";

type PokemonInfoProps = {
  pokemonName: string,
  dexId: string,
  baseStats: string,
  stats: {
    hp: number;
    attack: number;
    defense: number;
    spAttack: number;
    spDefense: number;
    speed: number;
  } | null,
  type1: string,
  type2: string | null,
  displayDefault: string,
  displayDefaultS: string
};

export const QuickView =  (
  {
    pokemonName, 
    dexId, 
    baseStats,
    stats,
    type1, 
    type2, 
    displayDefault, 
    displayDefaultS
  }: PokemonInfoProps
) => {

  return (
    <div id="PokemonQuickCardView" className="QuickView">
      <div id="PokemonImages" className="PokemonImages">
        <PokemonImage
          altImageName = {pokemonName}
          defaultFront = {displayDefault}
          defaultFrontS = {displayDefaultS}
        />
      </div>
      <div id="PokemonTypes">
        <TypeDisplay
          type1 = {type1}
          type2 = {type2}
        />
      </div>
      <div id="PokemonName">
        <NameDisplay
          name = {pokemonName}
          id = {dexId}
        />
      </div>
      <div id="PokemonStats">
        <StatDisplay
          baseStats = {baseStats}
          stats = {stats}
        />
      </div>
    </div>
  );
};

export default QuickView;
