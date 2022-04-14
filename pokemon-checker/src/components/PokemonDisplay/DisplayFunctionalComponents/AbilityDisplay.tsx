import * as React from "react";
import { pokemonAbilities } from "../../../DataTransferObjects/PokemonDTO";
import { Container, Box, Grid, ListItem, Popover } from "@mui/material";

type AbilityDisplayProps = {
  abilities: pokemonAbilities[];
};

//TODO: (Geoff) create custom styling for name
export const AbilityDisplay = ({ abilities }: AbilityDisplayProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [hoveredText, setHoveredText] = React.useState<string | null>(null);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    hovered: string
  ) => {
    setHoveredText(hovered);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const abilityClicked = Boolean(anchorEl);
  return (
    <Container fixed>
      <Box>
        {abilities.map((ability, i) => {
          return (
            <ListItem
              key={i}
              sx={{ fontSize: 14 }}
              onClick={(e) => handlePopoverOpen(e, ability[0].effect)}
              onMouseLeave={handlePopoverClose}
            >
              {RenderAbilityName(ability)}
              <Popover
                open={abilityClicked}
                sx={{
                  pointerEvents: "none",
                }}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                disableRestoreFocus
              >
                {hoveredText}
              </Popover>
            </ListItem>
          );
        })}
      </Box>
    </Container>
  );
};

/**
 * Render the ability name as well as if its hidden
 * @param ability the ability object which contains if its hidden
 * @returns an MUI container (any is used for now
 * todo: Geoff - define it properly)
 */
function RenderAbilityName(ability: pokemonAbilities): any {
  if (ability[1]) {
    return (
      <Grid container maxWidth="xs">
        <Box sx={{ fontStyle: "italic" }}>{ability[0].localizedName}</Box>
      </Grid>
    );
  }
  return (
    <Grid container maxWidth="xs" sx={{ display: "flex" }}>
      <Box maxWidth="100%" sx={{ textAlign: "left" }}>
        {ability[0].localizedName}
      </Box>
    </Grid>
  );
}
export default AbilityDisplay;
