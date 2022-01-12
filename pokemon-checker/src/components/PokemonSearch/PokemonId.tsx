import Box from "@mui/system/box";

type PokemonIdProps = {
  name: string;
  url: string;
  onSelectPokemon: (name: string, url: string) => void;
};

const PokemonId = ({ name, url, onSelectPokemon }: PokemonIdProps) => {
  return (
    <Box sx= {{ margin: '5px', fontSize: '10px' }}>
      <h2 onClick={() => onSelectPokemon(name, url)}>{name}</h2>
    </Box>
  );
};

export default PokemonId;
