import PokemonDTO from "../../DataTransferObjects/PokemonDTO";
import { QuickView } from "./PokemonQuickCardView";
import "../../App.css";
import WaitingView from "./DefaultDisplayView";
import Container from "@mui/material/Container";

type displayProps = {
  pokemonToRender: PokemonDTO | null;
};

export const PokemonDisplay = (props: displayProps) => {
  const { pokemonToRender } = props;

  if (pokemonToRender) {
    return (
      <Container maxWidth="sm">
        <QuickView pokemon={pokemonToRender} />
      </Container>
    );
  } else {
    return (
      <div className="AwaitingPokemon">
        <WaitingView />
      </div>
    );
  }
};

export default PokemonDisplay;
