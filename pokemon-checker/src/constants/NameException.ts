/**
 * Utility file to store hardcoded names that contain special characters that
 * we want to scrub but will affect other pokemon.
 */

export const HYPHEN_IN_NAME: string[] 
  = ["ho-oh", "porygon-z", "jangmo-o", "hakamo-o", "kommo-o"];

export const PERIOD_IN_NAME: { [key: string]: string} = {
  "mr-mime": "Mr. Mime", 
  "mime-jr": "Mime Jr.", 
  "mr-rime": "Mr. Rime"
};

export const GENDER_IN_NAME: { [key: string]: string} = {
  "nidoran-m": "Nidoran♂",
  "nidoran-f": "Nidoran♀"
};

export const APOSTAPHE_IN_NAME: { [key: string]: string} = {
  "farfetchd": "Farfetch'd",
  "sirfetchd": "Sirfetch'd"
};

export const DIACRITIC_IN_NAME: { [key: string]: string} = {
  "flabebe": "Flabébé"
};

export const COLON_IN_NAME: { [key: string]: string} = {
  "type-null": "Type: Null"
};
