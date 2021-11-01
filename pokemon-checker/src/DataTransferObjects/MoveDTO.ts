
enum moveType {
  PHYSICAL = "physical",
  SPECIAL = "special",
  STATUS = "status",
  NULL = "null"
}

type MoveConstructorOptions = {
  name: string,
  damage?: number,
  accuracy?: number,
  type?: moveType,
  description?: string,
  url?: string
}

class MoveDTO {
  public name: string;
  public damage: number;
  public accuracy: number;
  public type: moveType;
  public description: string;
  public url: string;

  constructor(MoveConstructorOptions: MoveConstructorOptions) {
    this.name = MoveConstructorOptions.name;
    this.damage = MoveConstructorOptions.damage ? MoveConstructorOptions.damage : -1;
    this.accuracy = MoveConstructorOptions.accuracy ? MoveConstructorOptions.accuracy : -1;
    this.type = MoveConstructorOptions.type ? MoveConstructorOptions.type : moveType.NULL;
    this.description = MoveConstructorOptions.description ? MoveConstructorOptions.description : "";
    this.url = MoveConstructorOptions.url ? MoveConstructorOptions.url : "";
  }
}
export default MoveDTO;