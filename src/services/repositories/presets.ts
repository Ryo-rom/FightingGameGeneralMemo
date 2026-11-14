import type { Buttons } from "@/data/types";
import { SQLiteDatabase } from "expo-sqlite";

import type { Presets } from "@/data/types";
import { runQuery } from "@/utils/repository";

export async function insertPreset(
  db: SQLiteDatabase,
  newPresetName: string,
  newPresetButtons: Buttons[],
) {
  try {
    await db.withExclusiveTransactionAsync(async (txn) => {
      const result1 = await txn.runAsync(
        `INSERT INTO presetName(pName) VALUES(?)`,
        [newPresetName],
      );
      if (result1.changes !== 1) {
        throw new Error("Fail inserting preset name.");
      }

      const pid = await txn.getFirstAsync<number>(
        `SELECT pId FROM presetName WHERE pName = ?`,
        [newPresetName],
      );
      if (!pid) {
        throw new Error("Fail finding pid.");
      }

      const placeholder = newPresetButtons.map(() => "(?, ?, ?)").join(", ");
      const prms = newPresetButtons.flatMap<number>((b) => [
        pid,
        b.index,
        b.bid,
      ]);

      const result2 = await txn.runAsync(
        `INSERT INTO buttonPreset(pid, idx, bid) VALUES ${placeholder}`,
        prms,
      );
      if (result2.changes !== newPresetButtons.length) {
        throw new Error("Fail inserting preset buttons.");
      }
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(`insertPreset: ${e.message}`);
    }
    throw e;
  }
}

export async function updatePresetName(
  db: SQLiteDatabase,
  pid: number,
  newPresetName: string,
) {
  try {
    await runQuery(db, `UPDATE presetName SET pName = ? WHERE pid = ?`, [
      newPresetName,
      pid,
    ]);
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(`updatePresetName: ${e.message}(pid=${pid})`);
    }
  }
}

export async function updatePresetButtons(
  db: SQLiteDatabase,
  pid: number,
  newButtons: Buttons[],
) {
  try {
    await db.withExclusiveTransactionAsync(async (txn) => {
      const numButtons = await txn.getFirstAsync<number>(
        `SELECT COUNT(*) FROM buttonPreset WHERE pid = ?`,
        pid,
      );
      const deleteOlds = await txn.runAsync(
        `DELETE FROM buttonPreset WHERE pid = ?`,
        pid,
      );
      if (deleteOlds.changes !== numButtons) {
        throw new Error(
          `Expected ${numButtons} to delete, but ${deleteOlds.changes} rows deleted while deleting buttons.`,
        );
      }

      const placeholder = newButtons.map(() => "(?, ?, ?)").join(", ");
      const prms = newButtons.flatMap<number>((b) => [pid, b.index, b.bid]);
      const result = await txn.runAsync(
        `INSERT INTO buttonPreset(pid, idx, bid) VALUES ${placeholder}`,
        prms,
      );
      if (result.changes !== newButtons.length) {
        throw new Error(
          `Expected ${newButtons.length} rows to insert, but ${result.changes} rows inserted.`,
        );
      }
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(`updatePresetButtons: ${e.message}`);
    }
    throw e;
  }
}

export async function deletePreset(db: SQLiteDatabase, pid: string) {
  try {
    await db.withExclusiveTransactionAsync(async (txn) => {
      const numButtons = await txn.getFirstAsync<number>(
        `SELECT COUNT(*) FROM buttonPreset WHERE pid = ?`,
        pid,
      );
      if (!numButtons) throw new Error(`Can't get the number of buttons`);

      await runQuery(txn, `DELETE FROM presetName WHERE pid = ?`, [pid]);
      await runQuery(
        txn,
        `DELETE FROM buttonPreset WHERE pid = ?`,
        [pid],
        numButtons,
      );
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(`deletePreset: ${e.message}(pid = ${pid})`);
    }
    throw e;
  }
}

export async function fetchPresetNameList(
  db: SQLiteDatabase,
): Promise<Presets[]> {
  return await db.getAllAsync<Presets>(`SELECT pid, pName FROM presetName`);
}

export async function fetchPresetButtons(
  db: SQLiteDatabase,
  pid: number,
): Promise<Buttons[]> {
  const sql = `SELECT bid, b.bName, idx
  FROM buttonPreset AS p
  INNER JOIN button AS b ON p.bid=b.bid
  WHERE pid = ?
  ORDER BY idx`;
  return await db.getAllAsync<Buttons>(sql, [pid]);
}
