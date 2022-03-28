import * as React from "react";
import { AbilityDTO } from "../../../DataTransferObjects/AbilityDTO";
import { Container, Box, Grid, ListItem, Popover } from "@mui/material";

type AbilityDisplayProps = {
  abilities: AbilityDTO[];
};
  
//TODO: (Geoff) create custom styling for name
export const AbilityDisplay = ( { abilities }: AbilityDisplayProps) => {
  const [anchorEl, setAnchorEl] 
    = React.useState<HTMLElement | null>(null);
  const [hoveredText, setHoveredText] = React.useState<string | null>(null);

  const handlePopoverOpen 
    = (event: React.MouseEvent<HTMLElement>, hovered: string) => {
    setHoveredText(hovered);
    setAnchorEl(event.currentTarget);
  }

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const abilityClicked = Boolean(anchorEl);
  return (
    <Container fixed>
      <Box>
        {
          abilities.map((ability, i) => {
            return (
              <ListItem
                key={i}
                sx={{ fontSize: 14 }}
                onClick={(e) => handlePopoverOpen(e, ability.effect)}
                onMouseLeave={handlePopoverClose}
              >
                {RenderAbilityName(ability)}
                <Popover
                  open={abilityClicked}
                  sx={{
                    pointerEvents: 'none',
                  }}
                  anchorEl={anchorEl}
                  onClose={handlePopoverClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  disableRestoreFocus
                  >
                  {hoveredText}
                </Popover>
              </ListItem>
            );
          })
        }
      </Box>
    </Container>
  );
}

/**
 * Render the ability name as well as if its hidden
 * @param ability the ability object which contains if its hidden
 * @returns an MUI container (any is used for now
 * todo: Geoff - define it properly)
 */
function RenderAbilityName(ability: AbilityDTO): any {
  if (ability.isHidden) {
    return (
      <Grid container maxWidth="xs">
        <Box sx={{ fontStyle: 'italic' }}>{ability.name}</Box>
      </Grid>
    );
  }
  return (
    <Grid container maxWidth="xs" sx={{ display: 'flex' }}>
      <Box maxWidth="100%" sx={{ textAlign: 'left' }}>{ability.name}</Box>
    </Grid>
  );
}
export default AbilityDisplay;