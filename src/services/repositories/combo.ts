import { runQuery } from "@/utils/repository";
import { SQLiteDatabase } from "expo-sqlite";

import { deleteComboSetByCoid } from "./comboSet";

export async function insertCombo(
  db: SQLiteDatabase,
  cmb: string,
  chid: number,
) {
  try {
    await runQuery(db, `INSERT INTO combo(combo, chid) VALUES (?, ?)`, [
      cmb,
      chid,
    ]);
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(`insertCombo: ${e.message}(combo=${cmb}, chid=${chid})`);
    }
  }
}

export async function updateCombo(
  db: SQLiteDatabase,
  cmb: string,
  coid: number,
) {
  try {
    await runQuery(db, `UPDATE combo SET combo = ? WHERE coid = ?`, [
      cmb,
      coid,
    ]);
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(`updateCombo: ${e.message}(coid = ${coid})`);
    }
  }
}

export async function deleteComboByCoid(db: SQLiteDatabase, coid: number) {
  try {
    await db.withTransactionAsync(async () => {
      await runQuery(db, `DELETE FROM combo WHERE coid = ?`, [coid]);
      await deleteComboSetByCoid(db, coid);
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(`deleteCombo: ${e.message}(coid=${coid})`);
    }
  }
}

export async function deleteComboByChid(db: SQLiteDatabase, chid: number) {
  const coids: { coid: number }[] = await db.getAllAsync<{ coid: number }>(
    `SELECT coid FROM combo WHERE chid = ?`,
    chid,
  );
  const placeholder = coids.map(() => "?").join(" OR ");

  if (!coids) {
    throw new Error(
      `deleteComboByChid: Can't find any combo with chid = ${chid}.`,
    );
  }

  try {
    await db.withTransactionAsync(async () => {
      await db.runAsync(`DELETE FROM combo WHERE chid = ?`, chid);
      await runQuery(
        db,
        `DELETE FROM comboSet WHERE coid = ${placeholder}`,
        coids.map((i) => i.coid),
        coids.length,
      );
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(`deleteComboByChid: ${e.message}.(chid = ${chid})`);
    }
  }
}
