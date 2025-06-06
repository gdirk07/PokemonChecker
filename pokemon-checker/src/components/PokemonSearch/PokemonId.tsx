import Box from "@mui/system/box";

type PokemonIdProps = {
  name: string;
  url: string;
  onSelectPokemon: (name: string, url: string) => void;
  onPokemonClicked: React.Dispatch<React.SetStateAction<string>>;
  active: string;
};

const PokemonId = ({
  name,
  url,
  onSelectPokemon,
  onPokemonClicked,
  active,
}: PokemonIdProps) => {
  const pokemonClicked = (name: string, url: string) => {
    onSelectPokemon(name, url);
    onPokemonClicked(name);
  };

  return (
    <Box sx={{ margin: "5px", fontSize: "10px" }}>
      <h2
        style={
          active === name ? { fontWeight: `bold` } : { fontWeight: `normal` }
        }
        onClick={() => pokemonClicked(name, url)}
      >
        {name}
      </h2>
    </Box>
  );
};

export default PokemonId;
