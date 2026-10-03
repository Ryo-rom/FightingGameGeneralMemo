import { W, type WordKey } from "@/data/constants/word";

export const ja: Record<WordKey, string> = {
  [W.ADD]: "追加",
  [W.BACK]: "戻る",
  [W.BUTTON]: "ボタン",
  [W.B_EDIT_BY_CHARA]: "キャラ毎のボタンセット編集",
  [W.B_EDIT_BY_PRESET]: "プリセット編集",
  [W.CHOOSE]: "選択",
  [W.COMBO]: "コンボ",
  [W.LICENCE]: "LICENCE",
  [W.MATCH_STR]: "キャラ対策",
  [W.MEMO]: "メモ",
  [W.SETPLAY]: "セットプレイ",
  [W.SETTINGS]: "設定",
  [W.TAG]: "タグ",
  [W.TAGS]: "タグ一覧",
  [W.TAG_ADD]: "タグ追加",
} as const;
