import { useState, useEffect } from "react";
import { pokemonAbilities } from "../../../DataTransferObjects/PokemonDTO";
import {
  Container,
  Box,
  Grid,
  List,
  ListItem,
  Collapse,
  Typography,
} from "@mui/material";

type AbilityDisplayProps = {
  abilities: pokemonAbilities[];
};

interface expandState {
  [ability: number]: boolean;
}

export const AbilityDisplay = ({ abilities }: AbilityDisplayProps) => {
  const [expanded, setExpanded] = useState<expandState | {}>({});

  //reset the collapse tab state when we get different props
  useEffect(() => {
    setExpanded({});
  }, [abilities]);

  const handleAbilityClicked = (index: number) => {
    setExpanded({ ...expanded, [index]: !(expanded as expandState)[index] });
  };

  return (
    <Container>
      <Box>
        {abilities.map((ability, i) => {
          let expand: boolean | null = (expanded as expandState)[i];
          return (
            <List key={i} onClick={() => handleAbilityClicked(i)}>
              <ListItem sx={{ padding: 0 }}>
                <Typography
                  sx={{ fontSize: "0.4em" }}
                  style={{ display: "inline-flex" }}
                >
                  {expand ? "\u25B2" : "\u25BC"}
                  {RenderAbilityName(ability)}
                </Typography>
              </ListItem>
              <Collapse
                in={(expanded as expandState)[i]}
                timeout="auto"
                unmountOnExit
              >
                <Typography sx={{ fontSize: "0.4em" }}>
                  {ability[0].effect}
                </Typography>
              </Collapse>
            </List>
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
