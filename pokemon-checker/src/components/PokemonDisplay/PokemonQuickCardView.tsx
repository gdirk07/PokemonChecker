import NameDisplay from "./DisplayFunctionalComponents/NameDisplay";
import StatDisplay from "./DisplayFunctionalComponents/StatDisplay";
import TypeDisplay from "./DisplayFunctionalComponents/TypeDisplay";
import PokemonImage from "./DisplayFunctionalComponents/PokemonImageDisplay";
import Grid from "@mui/material/Grid";

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
    <Grid container alignItems="center" columnSpacing={0}>
      <Grid item xs={12} sm={7}>
        <PokemonImage
          altImageName = {pokemonName}
          defaultFront = {displayDefault}
          defaultFrontS = {displayDefaultS}
        />
      </Grid>
      <Grid item xs={12} sm>
        <TypeDisplay
          type1 = {type1}
          type2 = {type2}
        />
        <NameDisplay
            name = {pokemonName}
            id = {dexId}
          />
      </Grid>
      <Grid item xs={12}>
        <StatDisplay
          baseStats = {baseStats}
          stats = {stats}
        />
      </Grid>
    </Grid>
  );
};

export default QuickView;
