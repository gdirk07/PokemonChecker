import { MoveFactory } from "./MoveFactory";
import PokemonDTO, {
  PokemonConstructorOptions,
} from "../DataTransferObjects/PokemonDTO";
import {
  IPokemonData,
  IPokemonStub,
  ITypeData,
} from "../interfaces/PokemonData";
import { ElementType } from "../constants/ElementTypes";
import { scrubPokemonName } from "../utils/NameScrubbingHelper";
import { AbilityService } from "../services/AbilityService";

export class PokemonFactory {
  private moveFactory: MoveFactory;
  private abilityService: AbilityService;

  constructor() {
    this.moveFactory = new MoveFactory();
    this.abilityService = new AbilityService();
  }

  private getFullPokemonConstructorProps = (
    data: IPokemonData
  ): PokemonConstructorOptions => {
    return {
      name: scrubPokemonName(data.name),
      id: data.id,
      types: data.types.map((slot) => slot.type),
      moves: data.moves.map((moveData) =>
        this.moveFactory.createMoveFromStub(moveData)
      ),
      abilities: data.abilities.map((abilityData) => [
        this.abilityService.createAbilityFromStub(abilityData),
        abilityData.is_hidden,
      ]),
      sprites: data.sprites,
      stats: data.stats.map((statData) => ({
        base_stat: statData.base_stat,
      })),
    };
  };

  /**
   * Creates pokemon data that can be used for rendering
   * @param pokemon Full data from the individual pokemon requests
   */
  public createPokemon = (pokemon: IPokemonData): PokemonDTO => {
    const createdPokemon = new PokemonDTO(
      this.getFullPokemonConstructorProps(pokemon)
    );
    return createdPokemon;
  };

  public fetchAbilities = async (pokemon : PokemonDTO): Promise<PokemonDTO> => {
    await Promise.all(pokemon.abilities.map(async (ability) => {
      if (!ability[0].hasFullData)
        //if retrieved from repository it likely has the data, otherwise...
        await this.abilityService.getFullAbilityDef(ability[0]);
    }));
    console.log("complete");
    return pokemon;
  }

  /**
   * Creates a partial pokemon DTO
   * @param pokemon Partial stub data from the summary call
   */
  public createPokemonStub = (pokemon: IPokemonStub): PokemonDTO => {
    // TODO: Introduce a null-type element
    const dummyType: ITypeData = {
      name: ElementType.BUG,
      url: "https://pokeapi.co/api/v2/type/7/",
    };
    const opts: PokemonConstructorOptions = {
      name: pokemon.name,
      id: -1,
      types: [dummyType],
      sprites: {
        back_default: null,
        back_female: null,
        back_shiny: null,
        back_shiny_female: null,
        front_default: "",
        front_female: null,
        front_shiny: "",
        front_shiny_female: null,
        other: {},
        versions: {},
      },
      moves: [],
      abilities: [],
      stats: [
        { base_stat: 0 },
        { base_stat: 0 },
        { base_stat: 0 },
        { base_stat: 0 },
        { base_stat: 0 },
        { base_stat: 0 },
      ],
      url: pokemon.url,
    };
    return new PokemonDTO(opts);
  };

  /**
   * Converts a partial DTO with only the URL to a full object
   */
  public convertStubToDTO = (
    dto: PokemonDTO,
    data: IPokemonData
  ): PokemonDTO => {
    const newPokemonProps: PokemonConstructorOptions = {
      ...this.getFullPokemonConstructorProps(data),
      url: dto.url,
    };
    return new PokemonDTO(newPokemonProps);
  };
}
