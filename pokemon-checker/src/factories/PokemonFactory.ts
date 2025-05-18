import { MoveFactory } from "./MoveFactory";
import PokemonDTO, {
  pokemonAbilities,
  PokemonConstructorOptions,
} from "../DataTransferObjects/PokemonDTO";
import {
  IPokemonData,
  IPokemonRepoData,
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
  private getStubConstructorProps = (
    data: IPokemonStub
  ): PokemonConstructorOptions => {
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
  };

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
      abilities: data.abilities.map((abilityData) => ({
        ability: this.abilityService.createAbilityFromStub(abilityData),
        isHidden: abilityData.is_hidden,
      })),
      sprites: data.sprites,
      stats: data.stats.map((statData) => ({
        base_stat: statData.base_stat,
      })),
    };
  };

  /**
   * Returns necessary constructor options from a saved local object
   * 
   * Note on abilities: the new struct for abilities matches the raw payload
   *   Compare bulbasaur-dto.json with API-raw-ability-array.txt
   * 
   * Full data is available in bulbasaur (minus ability slot)
   *   Formatted in an array the same as the raw payload
  
   * @param data Existing pokemon data pulled from browser storage
   */
  private getRestoredPokemonConstructorProps = (data: IPokemonRepoData) => {

    // Pokemon Repo Data looks like it's a superset of IPokemonData
    // Stub pokemon only have a name + URL, not an ID
    const isStub = data.dexId > 0;

    // Note: alt formes (arceus-bug, rotom-washer, etc.) are not regional species
    // Species API tells us if it exists in alola, galar, paldea
    // https://github.com/PokeAPI/pokeapi/issues/455

    // https://pokeapi.co/docs/v2#pokemon-species
    // https://pokeapi.co/api/v2/pokemon-species/{id or name}/

    if (isStub) {
      // Re-create the stub using what we know
      return this.getStubConstructorProps({ name: data.name, url: data.url });
    }

    // Well shit it's a whole ass thing now isn't it
    // Re-convert the type name string back to config format
    const typeArray = [{ slot: 1, type: { name: data.type1, url: "" } }];
    if (data.type2 && data.type2 !== "") {
      typeArray.push({ slot: 2, type: { name: data.type2, url: "" } });
    }

    // Restore move data
    const moveArray = data.moves.map((move) =>
      this.moveFactory.restoreSavedMove(move)
    );

    // Restore ability DTOs
    // Are they intended to be key/value pairs?
    const abilityArray = data.abilities.map((ability) =>
      this.abilityService.restoreSavedAbility(ability)
    );

    return {
      name: data.name,
      id: data.dexId,
      types: typeArray,
      moves: moveArray,
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

  /**
   * Re-creates a previous factory-made Pokemon from localStorage session,
   * regardless of if it lacks full data
   * @param savedMon Possible stub or full pokemon DTO retrieved from storage
   */
  public restorePokemonFromStorage = (savedMon: IPokemonRepoData) => {
    // const restoredMon = new PokemonDTO();
  };

  private fetchAbilities = async (pokemon: PokemonDTO): Promise<PokemonDTO> => {
    await Promise.all(
      pokemon.abilities.map(async (entry) => {
        if (!entry.ability.hasFullData)
          //if retrieved from repository it likely has the data, otherwise...
          await this.abilityService.getFullAbilityDef(entry.ability);
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
