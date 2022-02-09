/**
 * functional component for displaying images pertaining to the pokemon.
 * Note: For naming conventions, adding a capital "S" denotes a shiny varient
 * of the image
 */

type PokemonImageProps = {
  altImageName: string,
  defaultFront: string,
  defaultFrontS: string
};

const imageStyles = {
  maxHeight: "96px",
  maxWidth: "96px",
}

export const PokemonImage = ({
  altImageName,
  defaultFront,
  defaultFrontS
}: PokemonImageProps) => {
  return (
    <div>
      {
        <
          img 
          className="pokemonDisplay" 
          style={imageStyles} 
          src={defaultFront} 
          alt={altImageName}>
        </img>
      }
      {defaultFrontS ? (
        <
          img 
          className="pokemonDisplay" 
          style={imageStyles} 
          src={defaultFrontS} 
          alt={altImageName}
          >
        </img>
      ) : (
        //Pokemon should have a shiny, if not then we should log the error
        <h2>No Shiny</h2>
      )}
    </div>
  );
};

export default PokemonImage