import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  tableCellClasses,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    color: theme.palette.common.white,
    fontSize: 14,
    textAlign: "center",
  },
}));

type pokemonStats = {
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
  return (
    <div id="PokemonBaseStats">
      <h5>{baseStats}</h5>
      <Table sx={{ minWidth: 300 }} aria-label="stat table" color="white">
        <TableBody>
          <TableRow>
            <StyledTableCell>HP</StyledTableCell>
            <StyledTableCell>{stats?.hp}</StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell>Attack</StyledTableCell>
            <StyledTableCell>{stats?.attack}</StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell>Defense</StyledTableCell>
            <StyledTableCell>{stats?.defense}</StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell>Special Attack</StyledTableCell>
            <StyledTableCell>{stats?.spAttack}</StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell>Special Defense</StyledTableCell>
            <StyledTableCell>{stats?.spDefense}</StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell>Speed</StyledTableCell>
            <StyledTableCell>{stats?.speed}</StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default StatDisplay;
