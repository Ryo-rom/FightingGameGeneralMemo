export type Buttons = { bid: number; name: string; index: number };
export type Characters = { chid: number; name: string };

/**@remarks comboの技と技の間は_区切り */
export type Combos = { coid: number; combo: string };
/**@remarks type 0: 2値(valueが0ならfalse, 1ならtrue), 1: 整数値 */
export type Tags = {
  tid: number;
  name: string;
  coid: number;
  type: number;
  value: number;
};
