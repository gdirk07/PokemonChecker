import { useState } from "react";
import NameDisplay from "./DisplayFunctionalComponents/NameDisplay";
import StatDisplay from "./DisplayFunctionalComponents/StatDisplay";
import TypeDisplay from "./DisplayFunctionalComponents/TypeDisplay";
import AbilityDisplay from "./DisplayFunctionalComponents/AbilityDisplay";
import PokemonImage from "./DisplayFunctionalComponents/PokemonImageDisplay";
import PokemonDTO from "../../DataTransferObjects/PokemonDTO";
import Grid, { GridProps } from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import FlareIcon from '@mui/icons-material/Flare';
import { styled } from "@mui/material/styles";
import { shinyTheme } from "../../userinterface/CustomThemes"
import { useEffect } from "react";

const ShinyButtonDisplay = styled(Grid)<GridProps>(({ theme }) => ({
  alignSelf: 'flex-start',
  position: 'absolute',
}));

const SpriteDisplay = styled(Grid)<GridProps>(({ theme }) => ({
  alignSelf: `center`,
}));

const BasicInfoDisplay = styled(Grid)<GridProps>(({ theme }) => ({
  marginTop: `0.5em`,
}));

type PokemonInfoProps = {
  pokemon: PokemonDTO;
};

export const QuickView = ({ pokemon }: PokemonInfoProps) => {
  const [displayDefault, setSpriteDisplay] = useState(true);
  const {primary, secondary} = shinyTheme.palette;
  useEffect(() => {
    setSpriteDisplay(true);
  }, [pokemon])

  return (
    <Grid container alignItems="center" columnSpacing={2}>
      <ShinyButtonDisplay 
        theme={shinyTheme}
        display={pokemon.frontShiny ? true : false}
        color={displayDefault ? primary.main : secondary.main}>
        <label htmlFor="icon-button-file">
          <IconButton 
            color="inherit"
            onClick={() => setSpriteDisplay(!displayDefault)}
          >
            <FlareIcon />
          </IconButton>
        </label>
      </ShinyButtonDisplay>
      <SpriteDisplay item xs={9} sm={6}>
        <PokemonImage
          altImageName={pokemon.name}
          spriteImage={
            displayDefault ? 
            pokemon.frontDefault : 
            pokemon.frontShiny
          }
        />
      </SpriteDisplay>
      <BasicInfoDisplay item xs={12} sm={6}>
        <TypeDisplay type={pokemon.type1} />
        <TypeDisplay type={pokemon.type2} />
        <NameDisplay name={pokemon.name} id={pokemon.dexId} />
        <AbilityDisplay abilities={pokemon.abilities} />
      </BasicInfoDisplay>
      <Grid item xs={12}>
        <StatDisplay baseStats={pokemon.baseStats} stats={pokemon.stats} />
      </Grid>
    </Grid>
  );
};

export default QuickView;
