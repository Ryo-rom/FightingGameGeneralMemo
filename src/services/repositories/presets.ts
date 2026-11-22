import type { Buttons } from "@/data/types";
import { SQLiteDatabase } from "expo-sqlite";

import type { Presets } from "@/data/types";
import { countRows, runQuery } from "@/utils/repository";

export async function insertPreset(
  db: SQLiteDatabase,
  newPresetName: string,
  newPresetButtons: Buttons[],
) {
  try {
    await db.withTransactionAsync(async () => {
      const result1 = await db.runAsync(
        `INSERT INTO presetName(pName) VALUES(?)`,
        [newPresetName],
      );
      if (result1.changes !== 1) {
        throw new Error("Fail inserting preset name.");
      }

      const pid = (
        await db.getFirstAsync<{ p: number }>(
          `SELECT pid AS p FROM presetName WHERE pName = ?`,
          [newPresetName],
        )
      )?.p;
      if (!pid) {
        throw new Error("Fail finding pid.");
      }

      const placeholder = newPresetButtons.map(() => "(?, ?, ?)").join(", ");
      const prms = newPresetButtons.flatMap<number>((b) => [pid, b.idx, b.bid]);

      const result2 = await db.runAsync(
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
    await db.withTransactionAsync(async () => {
      const numButtons = await countRows(
        db,
        `SELECT COUNT(*) FROM buttonPreset WHERE pid = ?`,
        [pid],
      );
      await runQuery(
        db,
        `DELETE FROM buttonPreset WHERE pid = ?`,
        [pid],
        numButtons,
      );

      const placeholder = newButtons.map(() => "(?, ?, ?)").join(", ");
      const prms = newButtons.flatMap<number>((b) => [pid, b.idx, b.bid]);
      await runQuery(
        db,
        `INSERT INTO buttonPreset(pid, idx, bid) VALUES ${placeholder}`,
        prms,
        newButtons.length,
      );
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(`updatePresetButtons: ${e.message}`);
    }
  }
}

export async function deletePresetByPid(db: SQLiteDatabase, pid: string) {
  try {
    await db.withTransactionAsync(async () => {
      const numButtons = await countRows(
        db,
        `SELECT COUNT(*) FROM buttonPreset WHERE pid = ?`,
        [pid],
      );
      if (!numButtons) throw new Error(`Can't get the number of buttons`);

      await runQuery(db, `DELETE FROM presetName WHERE pid = ?`, [pid]);
      await runQuery(
        db,
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

export async function deletePresetByBid(db: SQLiteDatabase, bid: number) {
  const rows = await countRows(
    db,
    `SELECT COUNT(*) FROM buttonPreset WHERE bid = ?`,
    [bid],
  );
  if (!rows) {
    throw new Error(
      `deletePresetByBid: Can't find any rows with bid = ${bid}.`,
    );
  }
  try {
    await runQuery(db, `DELETE FROM buttonPreset WHERE bid = ?`, [bid], rows);
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(`deletePresetByBid: ${e.message}(bid=${bid})`);
    }
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
