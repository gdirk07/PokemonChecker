
export enum damageClass {
  PHYSICAL = "physical",
  SPECIAL = "special",
  STATUS = "status",
  NULL = "null"
}

export type MoveConstructorOptions = {
  name: string,
  power?: number,
  accuracy?: number,
  damage_class?: damageClass,
  description?: string,
  url?: string
}

export class MoveDTO {
  public name: string;
  public power: number;
  public accuracy: number;
  public damage_class: damageClass;
  public description: string;
  public url: string;

  constructor(MoveConstructorOptions: MoveConstructorOptions) {
    this.name = MoveConstructorOptions.name;
    this.power = MoveConstructorOptions.power ? MoveConstructorOptions.power : -1;
    this.accuracy = MoveConstructorOptions.accuracy ? MoveConstructorOptions.accuracy : -1;
    this.damage_class = MoveConstructorOptions.damage_class ? MoveConstructorOptions.damage_class : damageClass.NULL;
    this.description = MoveConstructorOptions.description ? MoveConstructorOptions.description : "";
    this.url = MoveConstructorOptions.url ? MoveConstructorOptions.url : "";
  }
}
export default MoveDTO;