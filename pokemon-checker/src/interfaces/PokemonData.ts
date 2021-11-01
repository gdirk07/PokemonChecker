
export interface IMoveStub {
  name: string;
  url: string;
}

/**
 * Dictates how a pokemon learns this move
 * e.g. 'machine', 'level-up', 'tutor'
 */
export interface IMoveLearnMethod {
  name: string;
  url: string;
}

export interface IMoveVersionGroup {
  name: string;
  url: string;
}

export interface IMoveVersion {
  level_learned_at: number;
  move_learn_method: IMoveLearnMethod;
  version_group: IMoveVersionGroup;
}

export interface IMoveSummary {
  moveStub: IMoveStub
  version_group_details: IMoveVersion[]
}