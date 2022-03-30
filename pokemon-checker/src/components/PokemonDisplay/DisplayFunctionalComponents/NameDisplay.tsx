import Container, {ContainerProps} from "@mui/material/Container";
import Grid, {GridProps} from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

const NameIdContainer = styled(Container)<ContainerProps>(({theme}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginLeft: `auto`,
}));
const NameStyle = styled(Grid)<GridProps>(({theme}) => ({

}));
type pokemonNameAndId = {
  name: string;
  id: number;
};

export const NameDisplay = ({ name, id }: pokemonNameAndId) => {
  return (
    <NameIdContainer>
      <NameStyle>
        {name}
      </NameStyle>
      <NameStyle>
        #{id}
      </NameStyle>
    </NameIdContainer>
    
  );
};

export default NameDisplay;
