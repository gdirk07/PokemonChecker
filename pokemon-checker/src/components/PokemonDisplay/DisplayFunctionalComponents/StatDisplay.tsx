import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import {
  statMaxThreshold,
  statColourDisplay,
} from "../../../constants/StatThresholds";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: "center",
  },
}));

export type pokemonStats = {
  baseStats: number;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    spAttack: number;
    spDefense: number;
    speed: number;
  } | null;
};

export const StatDisplay = ({ baseStats, stats }: pokemonStats) => {
  const hp = stats?.hp ? stats?.hp : 0;
  const att = stats?.attack ? stats?.attack : 0;
  const def = stats?.defense ? stats?.defense : 0;
  const spA = stats?.spAttack ? stats?.spAttack : 0;
  const spE = stats?.spDefense ? stats?.spDefense : 0;
  const spD = stats?.speed ? stats?.speed : 0;
  return (
    <div id="PokemonBaseStats">
      <h5>{baseStats}</h5>
      <Table
        sx={{ minWidth: 300, tableLayout: "fixed" }}
        aria-label="stat table"
        color="white"
      >
        <TableBody>
          <TableRow>
            <StyledTableCell sx={{ color: "#ffffff" }}>HP</StyledTableCell>
            <StyledTableCell sx={{ color: setDisplayColour(hp) }}>
              {stats?.hp}
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell sx={{ color: "#ffffff" }}>Attack</StyledTableCell>
            <StyledTableCell sx={{ color: setDisplayColour(att) }}>
              {stats?.attack}
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell sx={{ color: "#ffffff" }}>Defense</StyledTableCell>
            <StyledTableCell sx={{ color: setDisplayColour(def) }}>
              {stats?.defense}
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell sx={{ color: "#ffffff" }}>
              Special Attack
            </StyledTableCell>
            <StyledTableCell sx={{ color: setDisplayColour(spA) }}>
              {stats?.spAttack}
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell sx={{ color: "#ffffff" }}>
              Special Defense
            </StyledTableCell>
            <StyledTableCell sx={{ color: setDisplayColour(spE) }}>
              {stats?.spDefense}
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell sx={{ color: "#ffffff" }}>Speed</StyledTableCell>
            <StyledTableCell sx={{ color: setDisplayColour(spD) }}>
              {stats?.speed}
            </StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export const setDisplayColour = (stat: number): string => {
  if (stat >= statMaxThreshold.DECENT) {
    //green
    return statColourDisplay.GOOD;
  } else if (stat >= statMaxThreshold.LOW) {
    //Yellow
    return statColourDisplay.DECENT;
  } else if (stat >= statMaxThreshold.VERYLOW) {
    //Orange
    return statColourDisplay.LOW;
  } else {
    //Red
    return statColourDisplay.VERYLOW;
  }
};

export default StatDisplay;
