export type Buttons = { bid: number; bName: string; index: number };
export type Characters = { chid: number; cName: string };

/**@remarks Combo is separated by underscores between moves */
export type Combos = { coid: number; combo: string };

/**
 * @remarks
 * - Type 0: Binary value (value is 1 by default; 0 is omitted).
 * - Type 1: Integer value. */
export type Tags = {
  tid: number;
  coid: number;
  tName: string;
  type: number;
  value: number;
};

export type ComboWithTags = {
  cmb: Combos;
  tags: Tags[];
};
