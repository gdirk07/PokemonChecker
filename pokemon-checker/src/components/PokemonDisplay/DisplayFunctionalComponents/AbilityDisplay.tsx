import * as React from "react";
import { AbilityDTO } from "../../../DataTransferObjects/AbilityDTO";
import { ListItem, Popover } from "@mui/material";

type AbilityDisplayProps = {
  abilities: AbilityDTO[];
}

//TODO: (Geoff) create custom styling for name
export const AbilityDisplay = ( {abilities}: AbilityDisplayProps) => {
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
  }

  const abilityHovered = Boolean(anchorEl);
  return (
    <div className="ability-list">
        {
          abilities.map(ability => {
            return (
              <ListItem 
                sx={{ fontSize: 14 }}
                onMouseEnter={(e) => handlePopoverOpen(e, ability.effect)}
                onMouseLeave={handlePopoverClose}
              >
                {RenderAbilityName(ability)}
                <Popover 
                  open={abilityHovered}
                  sx={{
                    pointerEvents: 'none',
                  }}
                  anchorEl={anchorEl}
                  onClose={handlePopoverClose}
                  anchorOrigin={{
                    vertical: 'bottom',
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
    </div>
  );
}

function RenderAbilityName(ability: AbilityDTO): string {
  if (ability.isHidden) {
    return ability.name + " Hidden";
  }
  return ability.name;
}
export default AbilityDisplay;