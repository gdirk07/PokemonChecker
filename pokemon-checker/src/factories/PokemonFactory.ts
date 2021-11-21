import { MoveFactory } from "./MoveFactory";
import PokemonDTO, {
  PokemonConstructorOptions,
} from "../DataTransferObjects/PokemonDTO";
import { IPokemonData } from "../interfaces/PokemonData";
import { scrubPokemonName } from "../utils/Helper";

export class PokemonFactory {
  private moveFactory: MoveFactory;

  constructor() {
    this.moveFactory = new MoveFactory();
  }

  public createPokemon = (pokemon: IPokemonData): PokemonDTO => {
    const opts: PokemonConstructorOptions = {
      name: scrubPokemonName(pokemon.name),
      id: pokemon.id,
      types: pokemon.types.map((slot) => slot.type),
      moves: pokemon.moves.map((moveData) =>
        this.moveFactory.createMoveFromStub(moveData)
      ),
      sprites: pokemon.sprites,
      stats: pokemon.stats.map((statData) => ({
        base_stat: statData.base_stat,
      })),
    };

    return new PokemonDTO(opts);
  };
}
