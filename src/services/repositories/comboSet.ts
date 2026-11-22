import { countRows, runQuery } from "@/utils/repository";
import { SQLiteDatabase } from "expo-sqlite";

import type { Tags } from "@/data/types";

export async function insertComboSet(
  db: SQLiteDatabase,
  coid: number,
  tid: number,
  value: number,
) {
  try {
    await runQuery(
      db,
      `INSERT INTO comboSet(coid, tid, value) VALUES (?, ?, ?)`,
      [coid, tid, value],
    );
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(`insertComboSet: ${e.message}(coid=${coid}, tid=${tid})`);
    }
  }
}

export async function updateComboSet(
  db: SQLiteDatabase,
  coid: number,
  tid: number,
  newVal: number,
) {
  try {
    await runQuery(db, `UPDATE comboSet SET value=? WHERE coid=? AND tid=?`, [
      newVal,
      coid,
      tid,
    ]);
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(
        `updateComboSet: ${e.message}(coid=${coid}, tid=${tid}, newValue=${newVal})`,
      );
    }
  }
}

export async function deleteComboSetByCoid(db: SQLiteDatabase, coid: number) {
  try {
    const numCombos: number = await countRows(
      db,
      `SELECT COUNT(*) FROM comboSet WHERE coid = ?`,
      [coid],
    );
    if (!numCombos) {
      throw new Error(`Can't find any rows by coid.`);
    }
    await runQuery(
      db,
      `DELETE FROM comboSet WHERE coid = ?`,
      [coid],
      numCombos,
    );
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(`deleteComboSetByCoid: ${e.message}(coid=${coid})`);
    }
  }
}

export async function deleteComboSetByTid(db: SQLiteDatabase, tid: number) {
  try {
    const numCombos = await countRows(
      db,
      `SELECT COUNT(*) FROM comboSet WHERE tid = ?`,
      [tid],
    );
    if (!numCombos) {
      throw new Error(`Can't find any row by tid.`);
    }
    await runQuery(db, `DELETE FROM comboSet WHERE tid = ?`, [tid], numCombos);
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(`deleteComboSetByTid: ${e.message}(tid = ${tid})`);
    }
  }
}

export async function fetchComboSetByCoid(
  db: SQLiteDatabase,
  coid: number,
): Promise<Tags[]> {
  return await db.getAllAsync<Tags>(
    `SELECT c.tid, c.coid, t.tName, t.type, c.value 
        FROM comboSet AS c INNER JOIN tag AS t ON c.tid=t.tid
        WHERE coid = ?`,
    coid,
  );
}

/**
 *
 * @param db
 * @param tid
 * @param value
 * @returns coid[]
 */
export async function fetchComboSetByTid(
  db: SQLiteDatabase,
  tid: number,
  value: number,
): Promise<number[]> {
  return (
    await db.getAllAsync<{ coid: number }>(
      `SELECT coid FROM comboSet WHERE tid = ? AND value = ?`,
      [tid, value],
    )
  ).map((v) => v.coid);
}
