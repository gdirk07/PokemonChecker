type pokemonNameAndId = {
  name: string,
  id: string
};

export const NameDisplay = ({ name, id }: pokemonNameAndId) => {
  return (
    <div id="PokemonName">
      <h5>
        {name} {id}
      </h5>
    </div>
  );
};

export default NameDisplay;