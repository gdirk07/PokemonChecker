import { ElementType } from "../../../constants/ElementTypes";

type TypeDisplayProps = {
  type: ElementType
}

export const TypeDisplay = ({ type }: TypeDisplayProps) => {
  if (type === ElementType.NULL) {
    return <></>;
  }

  return <span>{type}</span>;
};

export default TypeDisplay;
