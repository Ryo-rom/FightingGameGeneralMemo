import { W, type WordKey } from "@/data/constants/word";

export const en: Record<WordKey, string> = {
  [W.ADD]: "Add",
  [W.BACK]: "Back",
  [W.BUTTON]: "Buttons",
  [W.B_EDIT_BY_CHARA]: "Edit Character's Button set",
  [W.B_EDIT_BY_PRESET]: "Edit Button Preset",
  [W.CHOOSE]: "Select",
  [W.COMBO]: "COMBO",
  [W.LICENCE]: "LICENCE",
  [W.MATCH_STR]: "MATCHUP STRATEGY",
  [W.MEMO]: "MEMO",
  [W.SETPLAY]: "SETPLAY",
  [W.SETTINGS]: "SETTINGS",
  [W.TAG]: "TAG",
  [W.TAGS]: "Tags",
  [W.TAG_ADD]: "Add Tag",
} as const;
