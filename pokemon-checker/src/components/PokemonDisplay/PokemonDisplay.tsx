import React from "react";
import PokemonDTO from "../../DataTransferObjects/PokemonDTO";
import { IPokemonData } from "../../interfaces/PokemonData";
import { PokemonFactory } from "../../factories/PokemonFactory";
import { QuickView } from "./PokemonQuickCardView";
import "../../App.css";
import WaitingView from "./DefaultDisplayView";
import Container from "@mui/material/Container";
import { AbilityService } from "../../services/AbilityService";

type displayProps = {
  pokemonUrl: string;
  getPokemonData: (url: string) => Promise<any>;
};

type displayState = {
  pokemonObject: {
    name?: string;
    id?: string;
    moves?: string[];
    type1?: string;
    type2?: string | null;
    sprites?: {
      frontDefault: string;
      frontShiny: string;
    };
  };
};

class PokemonDisplay extends React.Component<displayProps, displayState> {
  private pokemonToDisplay: PokemonDTO | null;
  //TODO (jeremy): Move this factory to a service! Views shouldn't control this.
  private pokemonFactory: PokemonFactory;
  private abilityService: AbilityService;

  constructor(props: displayProps) {
    super(props);
    this.state = {
      pokemonObject: {},
    };
    this.pokemonToDisplay = null;
    this.pokemonFactory = new PokemonFactory();
    this.abilityService = new AbilityService();
  }

  componentDidUpdate(prevProps: displayProps) {
    const prevUrl = prevProps.pokemonUrl;
    const url = this.props.pokemonUrl;
    if (prevUrl !== url) {
      this.fetchPokemonObject();
    }
  }

  fetchPokemonObject() {
    const url = this.props.pokemonUrl;
    if (url && url !== "") {
      this.props
        .getPokemonData(url)
        .then((pokemonRetrieved) => this.createPokemonObject(pokemonRetrieved))
        .catch(console.log);
    }
  }

  /**
   * Create a PokemonObject from the results retrieved
   * @param pokemonRetrieved the pokemon retrieved from the API
   */
  createPokemonObject(pokemonRetrieved: IPokemonData): void {
    this.pokemonToDisplay = this.pokemonFactory.createPokemon(pokemonRetrieved);
    this.pokemonToDisplay.abilities.forEach(ability => {
      this.abilityService.getAbility(ability.url)
        .then(( fetchedAbility ) =>  {
          ability.setDescription(fetchedAbility.effect_entries[1].short_effect);
        })
        .catch(( error ) => {
          console.error(error.message);
        });

    })
    this.setState({ pokemonObject: this.pokemonToDisplay.getDisplayStats() });
  }

  render() {
    const pokemon = this.pokemonToDisplay;

    if (pokemon) {
      return (
        <Container maxWidth="sm">
          <QuickView pokemon={pokemon} />
        </Container>
      );
    } else {
      return (
        <div className="AwaitingPokemon">
          <WaitingView />
        </div>
      );
    }
  }
}

export default PokemonDisplay;
