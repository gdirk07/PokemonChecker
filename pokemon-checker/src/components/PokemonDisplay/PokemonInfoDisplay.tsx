/**
 * function component for displaying pokemon info statistics
 */

type PokemonInfoProps = {
  pokemonName: string,
  dexId: string,
  baseStats: string,
  type1: string,
  type2: string | null,
};

export const PokemonInfo = ({ 
  pokemonName, 
  dexId, 
  baseStats, 
  type1, 
  type2 }: PokemonInfoProps) => {
  return (
    <div>
      <h2>
        {pokemonName}
        {dexId}
      </h2>
      <h5>{baseStats}</h5>
      <h5>
        {type1} {type2}
      </h5>
    </div>
  );
};

export default PokemonInfo;