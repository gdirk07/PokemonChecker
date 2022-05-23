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

const DisplayBorder = styled(Grid)<GridProps>(({ theme }) => ({
  border: `3px double`,
  borderRadius: `5px`,
  padding: `10px`,
}));

const ShinyButtonDisplay = styled(Grid)<GridProps>(({ theme }) => ({
  alignSelf: 'flex-start',
  position: 'absolute',
}));

const SpriteDisplay = styled(Grid)<GridProps>(({ theme }) => ({
  alignSelf: `flex-start`,
  marginTop: '1em',
}));

const BasicInfoDisplay = styled(Grid)<GridProps>(({ theme }) => ({
}));

const StatInfoDisplay = styled(Grid)<GridProps>(({ theme}) => ({
  marginTop: '0.5em',
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
    <DisplayBorder 
      container 
      direction="row" 
      alignItems="stretch" 
      columnSpacing={1}
    >
      <ShinyButtonDisplay 
        theme={shinyTheme}
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
      <SpriteDisplay item xs={6} sm={2}>
        <PokemonImage
          altImageName={pokemon.name}
          spriteImage={
            displayDefault ? 
            pokemon.frontDefault : 
            pokemon.frontShiny
          }
        />
      </SpriteDisplay>
      <BasicInfoDisplay item xs={6} sm={4}>
        <TypeDisplay type={pokemon.type1} />
        <TypeDisplay type={pokemon.type2} />
        <NameDisplay name={pokemon.name} id={pokemon.dexId} />
        <AbilityDisplay abilities={pokemon.abilities} />
      </BasicInfoDisplay>
      <StatInfoDisplay item xs={12} sm={6}>
        <StatDisplay baseStats={pokemon.baseStats} stats={pokemon.stats} />
      </StatInfoDisplay>
    </DisplayBorder>
  );
};

export default QuickView;
