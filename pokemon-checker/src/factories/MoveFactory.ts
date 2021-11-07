import { IMoveSummary, IMoveData } from "../interfaces/PokemonData";
import {
  MoveConstructorOptions,
  MoveDTO,
} from "../DataTransferObjects/MoveDTO";

export class MoveFactory {
  public createMoveFromStub = (stubData: IMoveSummary): MoveDTO => {
    const opts: MoveConstructorOptions = {
      name: stubData.move.name,
      url: stubData.move.url,
    };

    return new MoveDTO(opts);
  };

  public createMoveFromData = (moveData: IMoveData): MoveDTO => {
    const opts: MoveConstructorOptions = {
      name: moveData.name,
      power: moveData.power,
      accuracy: moveData.accuracy,
      damage_class: moveData.damage_class,
      description: moveData.description,
      url: moveData.url
    }

    return new MoveDTO(opts);
  };
}
