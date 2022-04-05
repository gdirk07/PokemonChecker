import { ElementType } from "../../../constants/ElementTypes";

type TypeDisplayProps = {
  type: ElementType;
};

const spaceStyles = {
  borderRadius: "0.25rem",
  margin: "0 0.2rem",
  padding: "0 0.3rem",
  width: "100%",
};

const sizeStyles = {
  fontSize: `1rem`,
}

const getColourStyles = (type: ElementType) => {
  const colourObject = {
    backgroundColor: "",
    color: "#fff",
    textShadow: "1px 1px 2px #000",
  };
  switch (type) {
    case ElementType.BUG:
      colourObject.backgroundColor = "#71c049";
      break;
    case ElementType.DARK:
      colourObject.backgroundColor = "#564336";
      break;
    case ElementType.DRAGON:
      colourObject.backgroundColor = "#510ff0";
      break;
    case ElementType.ELECTRIC:
      colourObject.backgroundColor = "#f1c310";
      break;
    case ElementType.FAIRY:
      colourObject.backgroundColor = "#f65bff";
      break;
    case ElementType.FIGHTING:
      colourObject.backgroundColor = "#b32c25";
      break;
    case ElementType.FIRE:
      colourObject.backgroundColor = "#eb7928";
      break;
    case ElementType.FLYING:
      colourObject.backgroundColor = "#9c87d9";
      break;
    case ElementType.GHOST:
      colourObject.backgroundColor = "#66508b";
      break;
    case ElementType.GRASS:
      colourObject.backgroundColor = "#6ebd47";
      break;
    case ElementType.GROUND:
      colourObject.backgroundColor = "#ddbb5d";
      break;
    case ElementType.ICE:
      colourObject.backgroundColor = "#8fd4d4";
      break;
    case ElementType.NORMAL:
      colourObject.backgroundColor = "#a0a070";
      break;
    case ElementType.POISON:
      colourObject.backgroundColor = "#983c98";
      break;
    case ElementType.PSYCHIC:
      colourObject.backgroundColor = "#f74f82";
      break;
    case ElementType.ROCK:
      colourObject.backgroundColor = "#b09935";
      break;
    case ElementType.STEEL:
      colourObject.backgroundColor = "#b2b2cb";
      break;
    case ElementType.WATER:
      colourObject.backgroundColor = "#5985ee";
      break;
    case ElementType.NULL:
    default:
      colourObject.color = "inherit";
      colourObject.backgroundColor = "inherit";
      break;
  }

  return colourObject;
};

export const TypeDisplay = ({ type }: TypeDisplayProps) => {
  if (type === ElementType.NULL) {
    return <></>;
  }

  const combinedStyles = { ...spaceStyles, ...getColourStyles(type), ...sizeStyles };

  return <span style={combinedStyles}>{type}</span>;
};

export default TypeDisplay;
