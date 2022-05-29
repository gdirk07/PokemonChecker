/**
 * functional component for displaying images pertaining to the pokemon.
 * Note: For naming conventions, adding a capital "S" denotes a shiny varient
 * of the image
 */

type PokemonImageProps = {
  altImageName: string;
  spriteImage: string;
};

const imageStyles = {
  maxHeight: "96px",
  maxWidth: "96px",
};

export const PokemonImage = ({
  altImageName,
  spriteImage,
}: PokemonImageProps) => {
  return (
    <div>
      {
        <img
          className="pokemonDisplay"
          style={imageStyles}
          src={spriteImage}
          alt={altImageName}
        ></img>
      }
    </div>
  );
};

export default PokemonImage;
