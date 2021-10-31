
enum moveType {
  PHYSICAL = "physical",
  SPECIAL = "special",
  STATUS = "status"
}

type MoveConstructorOptions = {
  name: string,
  damage: number,
  accuracy: number,
  type: moveType,
  description: string
}

class MoveDTO {
  public name: string;
  public damage: number;
  public accuracy: number;
  public type: moveType;
  public description: string;

  constructor(MoveConstructorOptions: MoveConstructorOptions) {
    this.name = MoveConstructorOptions.name;
    this.damage = MoveConstructorOptions.damage;
    this.accuracy = MoveConstructorOptions.accuracy;
    this.type = MoveConstructorOptions.type;
    this.description = MoveConstructorOptions.description;
  }
}
export default MoveDTO;