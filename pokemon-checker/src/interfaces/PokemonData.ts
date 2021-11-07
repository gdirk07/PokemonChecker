
/**
 * Raw object received with Pokemon data. Contains the name and a link.
 */
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

/**
 * Contains a link to the move in different versions of the game
 * e.g. 'gold-silver', 'platinum', 'black-2-white-2'
 */
export interface IMoveVersionGroup {
  name: string;
  url: string;
}

/**
 * Move acquisition metadata for each Pokemon version
 */
export interface IMoveVersion {
  level_learned_at: number;
  move_learn_method: IMoveLearnMethod;
  version_group: IMoveVersionGroup;
}

/**
 * Contains the move stub info, as well as all versions
 */
export interface IMoveSummary {
  moveStub: IMoveStub
  version_group_details: IMoveVersion[]
}