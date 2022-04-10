/**
 * Constants for determining if a stat is low, decent, or high
 */

export const enum statMaxThreshold {
  VERYLOW = 40,
  LOW = 70,
  DECENT = 100,
}

export const enum statColourDisplay {
  VERYLOW = "#ff0000",
  LOW = "#ffa500",
  DECENT = "#ffff00",
  GOOD = "#00ff00",
}
