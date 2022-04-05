import NameDisplay from "./DisplayFunctionalComponents/NameDisplay";
import StatDisplay from "./DisplayFunctionalComponents/StatDisplay";
import TypeDisplay from "./DisplayFunctionalComponents/TypeDisplay";
import AbilityDisplay from "./DisplayFunctionalComponents/AbilityDisplay";
import PokemonImage from "./DisplayFunctionalComponents/PokemonImageDisplay";
import PokemonDTO from "../../DataTransferObjects/PokemonDTO";
import Grid, {GridProps} from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

const SpriteDisplay = styled(Grid)<GridProps>(( { theme } ) => ({
  alignSelf: `start`,
}));

const BasicInfoDisplay = styled(Grid)<GridProps>(( { theme } ) => ({

}));

type PokemonInfoProps = {
  pokemon: PokemonDTO;
};

export const QuickView = ({ pokemon }: PokemonInfoProps) => {
  return (
    <Grid container alignItems="center" columnSpacing={2}>
      <SpriteDisplay item xs={12} sm={6}>
        <PokemonImage
          altImageName={pokemon.name}
          defaultFront={pokemon.frontDefault}
          defaultFrontS={pokemon.frontShiny}
        />
      </SpriteDisplay>
      <BasicInfoDisplay item xs={12} sm={6}>
        <TypeDisplay type={pokemon.type1} />
        <TypeDisplay type={pokemon.type2} />
        <NameDisplay name={pokemon.name} id={pokemon.dexId} />
      </BasicInfoDisplay>

      <Grid item xs={12}>
        <StatDisplay baseStats={pokemon.baseStats} stats={pokemon.stats} />
      </Grid>
    </Grid>
  );
};

export default QuickView;
