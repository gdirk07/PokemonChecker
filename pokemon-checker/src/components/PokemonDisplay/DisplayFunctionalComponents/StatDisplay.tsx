import { styled } from "@mui/material/styles";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  tableCellClasses,
  Typography,
} from "@mui/material";
import {
  statMaxThreshold,
  statColourDisplay,
} from "../../../constants/StatThresholds";
import { GenerateBar } from "../../PercentageBar";

const StatLabelTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    border: 0,
    color: '#fff',
    fontSize: 12,
    paddingRight: '5px',
    textAlign: 'right',
    minWidth: '35px',
  },
}));

const StatValueTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    border: 0,
    fontSize: 12,
    paddingRight: '5px',
    textAlign: 'right',
    whiteSpace: 'nowrap',
    minWidth: '30px',
  },
}));

const ColorBarTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    border: 0,
    width: '100%',
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
  const spD = stats?.spDefense ? stats?.spDefense : 0;
  const spE = stats?.speed ? stats?.speed : 0;

  const MAXBARWIDTH = 200;
  return (
    <Grid 
      container 
      spacing={0}
      alignItems='center'
      justifyContent='center'
    >
      <Grid item xs={12} sm={3}>
        <Typography>
          Base Total Stats {baseStats}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={9}>
        <Table
          sx={{ margin: 'auto', maxWidth: 300 }}
          aria-label="stat table"
          padding="none"
          size="small"
        >
          <TableBody>
            <TableRow>
              <StatLabelTableCell>HP</StatLabelTableCell>
              <StatValueTableCell sx={{ color: setDisplayColour(hp)}}>
                {stats?.hp}: 
              </StatValueTableCell>
              <ColorBarTableCell>
                <GenerateBar
                    max={MAXBARWIDTH}
                    value={hp}
                    color={setDisplayColour(hp)} 
                  />
              </ColorBarTableCell>
            </TableRow>
            <TableRow>
              <StatLabelTableCell>ATK</StatLabelTableCell>
              <StatValueTableCell sx={{ color: setDisplayColour(att) }}>
                {stats?.attack}:
              </StatValueTableCell>
              <ColorBarTableCell>
                <GenerateBar
                    max={MAXBARWIDTH}
                    value={att}
                    color={setDisplayColour(att)} 
                  />
              </ColorBarTableCell>
            </TableRow>
            <TableRow>
              <StatLabelTableCell>DEF</StatLabelTableCell>
              <StatValueTableCell sx={{ color: setDisplayColour(def) }}>
                {stats?.defense}:
              </StatValueTableCell>
              <ColorBarTableCell>
                <GenerateBar
                    max={MAXBARWIDTH}
                    value={def}
                    color={setDisplayColour(def)} 
                  />
              </ColorBarTableCell>
            </TableRow>
            <TableRow>
              <StatLabelTableCell>SPA</StatLabelTableCell>
              <StatValueTableCell sx={{ color: setDisplayColour(spA) }}>
                {stats?.spAttack}:
              </StatValueTableCell>
              <ColorBarTableCell>
                <GenerateBar
                    max={MAXBARWIDTH}
                    value={spA}
                    color={setDisplayColour(spA)} 
                  />
              </ColorBarTableCell>
            </TableRow>
            <TableRow>
              <StatLabelTableCell>SPD</StatLabelTableCell>
              <StatValueTableCell sx={{ color: setDisplayColour(spD) }}>
                {stats?.spDefense}:
              </StatValueTableCell>
              <ColorBarTableCell>
                <GenerateBar
                    max={MAXBARWIDTH}
                    value={spD}
                    color={setDisplayColour(spD)} 
                  />
              </ColorBarTableCell>
            </TableRow>
            <TableRow>
              <StatLabelTableCell>SPE</StatLabelTableCell>
              <StatValueTableCell sx={{ color: setDisplayColour(spE) }}>
                {stats?.speed}:
              </StatValueTableCell>
              <ColorBarTableCell>
                <GenerateBar
                    max={MAXBARWIDTH}
                    value={spE}
                    color={setDisplayColour(spE)} 
                  />
              </ColorBarTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    </Grid>
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
