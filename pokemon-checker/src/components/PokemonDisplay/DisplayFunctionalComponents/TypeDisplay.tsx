type pokemonTypes = {
  type1: string,
  type2: string | null
};

export const TypeDisplay  = ({type1, type2}: pokemonTypes) => {
  return (
    <div id="PokemonTypes">
      <h5>
        {type1} {type2}
      </h5>
    </div>
  );
};

export default TypeDisplay;