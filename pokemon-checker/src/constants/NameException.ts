/**
 * Utility file to store hardcoded names that contain special characters that
 * we want to scrub but will affect other pokemon.
 */

export const HyphenInName: string[] 
  = ["ho-oh", "porygon-z", "jangmo-o", "hakamo-o", "kommo-o"];

export const PeriodInName: { [key: string]: string} = {
  "mr-mime": "Mr. Mime", 
  "mime-jr": "Mime Jr.", 
  "mr-rime": "Mr. Rime"
};

export const GenderInName: { [key: string]: string} = {
  "nidoran-m": "Nidoran♂",
  "nidoran-f": "Nidoran♀"
};

export const apostrapheInName: { [key: string]: string} = {
  "farfetchd": "Farfetch'd",
  "sirfetchd": "Sirfetch'd"
};

export const diacriticInName: { [key: string]: string} = {
  "flabebe": "Flabébé"
};

export const colonInName: { [key: string]: string} = {
  "type-null": "Type: Null"
};
