type pokemonTypes = {
  type: string | null;
};

export const TypeDisplay = ({ type }: pokemonTypes) => {
  if (!type) {
    return <></>;
  }

  return <span>{type}</span>;
};

export default TypeDisplay;
