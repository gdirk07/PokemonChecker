import "../PokemonDisplayStyle.css";

type pokemonStats = {
  baseStats: string
  stats: {
    hp: number;
    attack: number;
    defense: number;
    spAttack: number;
    spDefense: number;
    speed: number;
  } | null
};

export const StatDisplay = ({ baseStats, stats }: pokemonStats) => {
  return (
    <div id="PokemonBaseStats">
      <h5>
        {baseStats}
      </h5>
      <table className="StatTable">
        <tr>
          <th>
            HP
          </th>
          <td>
            {stats?.hp}
          </td>
        </tr>
        <tr>
          <th>
            Attack
          </th>
          <td>
            {stats?.attack}
          </td>
        </tr>
        <tr>
          <th>
            Defense
          </th>
          <td>
            {stats?.defense}
          </td>
        </tr>
        <tr>
          <th>
            Special Attack
          </th>
          <td>
            {stats?.spAttack}
          </td>
        </tr>
        <tr>
          <th>
            Special Defense
          </th>
          <td>
            {stats?.spDefense}
          </td>
        </tr>
        <tr>
          <th>
            Speed
          </th>
          <td>
            {stats?.speed}
          </td>
        </tr>
      </table>
    </div>
  );
};

export default StatDisplay;