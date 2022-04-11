import { useState, MouseEvent } from "react";
import { pokemonAbilities } from "../../../DataTransferObjects/PokemonDTO";
import { Container, Box, Grid, ListItem, Popover, Typography } from "@mui/material";

type AbilityDisplayProps = {
  abilities: pokemonAbilities[];
};

//TODO: (Geoff) create custom styling for name
export const AbilityDisplay = ({ abilities }: AbilityDisplayProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [hoveredText, setHoveredText] = useState<string | null>(null);

  const handlePopoverOpen = (
    event: MouseEvent<HTMLElement>,
    hovered: string
  ) => {
    setHoveredText(hovered);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const abilityContainer = {
    height: `4em`,
  };

  const abilityClicked = Boolean(anchorEl);
  return (
    <Container fixed>
      <Box sx={abilityContainer}>
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
                <Typography sx ={{ p:0.5 }}>
                  {hoveredText}
                </Typography>
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
 * @param ability the ability container that has the DTO and whether its hidden
 * @returns an MUI container (any is used for now)
 * todo: Geoff - define it properly)
 */
function RenderAbilityName(ability: pokemonAbilities): any {
  if (ability[1]) {
    return (
      <Grid container maxWidth="xs">
        <Box sx={{ fontStyle: "italic" }}>{ability[0].name}</Box>
      </Grid>
    );
  }
  return (
    <Grid container maxWidth="xs" sx={{ display: "flex" }}>
      <Box maxWidth="100%" sx={{ textAlign: "left" }}>
        {ability[0].name}
      </Box>
    </Grid>
  );
}
export default AbilityDisplay;
