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

  /**
   * Returns constructor options given stub data (name, url)
   * @param data Stub data from general pokemon search query
   */
  private getStubConstructorProps = (data: IPokemonStub): PokemonConstructorOptions => {
    const dummyType: ITypeData = {
      name: ElementType.NULL,
      url: "",
    };
    return {
      name: data.name,
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
      url: data.url,
    };
  }

  /**
   * Returns a full set of constructor options to be used in
   * creating a more complete PokemonDTO
   * @param data Full pokemon payload from the API
   */
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
  public createPokemon = async (pokemon: IPokemonData): Promise<PokemonDTO> => {
    const createdPokemon = new PokemonDTO(
      this.getFullPokemonConstructorProps(pokemon)
    );
    //fetch abilities
    //ToDo: expand this to be more general, will help when we have to fetch
    //moves and other calls that can take time by making them async but wait
    //until all the details are returned
    const pokeWithAbilities = this.fetchAbilities(createdPokemon);
    return pokeWithAbilities;
  };

  private fetchAbilities = async (pokemon: PokemonDTO): Promise<PokemonDTO> => {
    await Promise.all(
      pokemon.abilities.map(async (ability) => {
        if (!ability[0].hasFullData)
          //if retrieved from repository it likely has the data, otherwise...
          await this.abilityService.getFullAbilityDef(ability[0]);
      })
    );
    return pokemon;
  };

  /**
   * Creates a partial pokemon DTO
   * @param pokemon Partial stub data from the summary call
   */
  public createPokemonStub = (pokemon: IPokemonStub): PokemonDTO => {
    const opts = this.getStubConstructorProps(pokemon);
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
