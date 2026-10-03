export const W = {
  ADD: "add",
  BACK: "back",
  BUTTON: "button",
  B_EDIT_BY_CHARA: "bEditByChara",
  B_EDIT_BY_PRESET: "bEditByPreset",
  CHOOSE: "choose",
  COMBO: "combo",
  LICENCE: "licence",
  MATCH_STR: "matchStr",
  MEMO: "memo",
  SETPLAY: "setPlay",
  SETTINGS: "settings",
  TAG: "tag",
  TAGS: "tags",
  TAG_ADD: "tagAdd",
} as const;

export type WordKey = (typeof W)[keyof typeof W];
