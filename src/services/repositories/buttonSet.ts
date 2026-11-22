import { SQLiteDatabase } from "expo-sqlite";

import type { Buttons } from "@/data/types";
import { countRows, runQuery } from "@/utils/repository";

export async function insertButtonSet(
  db: SQLiteDatabase,
  chid: number,
  buttons: Buttons[],
) {
  const placeholder = buttons.map(() => "(?, ?, ?)").join(", ");
  const prms = buttons.flatMap<number>((b) => [chid, b.bid, b.idx]);
  try {
    await db.withTransactionAsync(async () => {
      const result = await db.runAsync(
        `INSERT INTO buttonSet(chid, bid, idx) VALUES ${placeholder}`,
        prms,
      );
      const numButtons = buttons.length;

      if (result.changes !== numButtons) {
        throw new Error(
          `Expected ${numButtons} rows to change, but ${result.changes} rows changed.`,
        );
      }
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(`insertButtonSet: ${e.message}(chid=${chid})`);
    }
  }
}

export async function updateButtonSet(
  db: SQLiteDatabase,
  chid: number,
  buttons: Buttons[],
) {
  const numButtons = buttons.length;
  const placeholder = buttons.map(() => "(?, ?, ?)").join(", ");
  const prms = buttons.flatMap((b) => [chid, b.bid, b.idx]);

  try {
    await db.withTransactionAsync(async () => {
      await db.runAsync(`DELETE FROM buttonSet WHERE chid = ?`, chid);
      const result = await db.runAsync(
        `INSERT INTO buttonSet(chid, bid, idx) VALUES ${placeholder}`,
        prms,
      );

      if (result.changes !== numButtons) {
        throw new Error(
          `Expected ${numButtons} rows to change, but ${result.changes} rows changed.`,
        );
      }
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(`updateButtonSet: ${e.message}(chid=${chid})`);
    }
  }
}

export async function deleteButtonSetByChid(db: SQLiteDatabase, chid: number) {
  const rows: number = await countRows(
    db,
    `SELECT COUNT(*) FROM buttonSet WHERE chid = ?`,
    [chid],
  );

  if (!rows) {
    throw new Error(
      `deleteButtonSetByChid: Can't find any buttons with chid=${chid}.`,
    );
  }

  try {
    await runQuery(db, `DELETE FROM buttonSet WHERE chid = ?`, [chid], rows);
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(`deleteButtonSetByChid: ${e.message}(chid=${chid})`);
    }
  }
}

export async function deleteButtonSetByBid(db: SQLiteDatabase, bid: number) {
  const rows: number = await countRows(
    db,
    `SELECT COUNT(*) FROM buttonSet WHERE bid=?`,
    [bid],
  );
  if (!rows) {
    throw new Error(
      `deleteButtonSetByBid: Can't find any buttons with bid=${bid}.`,
    );
  }
  try {
    await runQuery(db, `DELETE FROM buttonSet WHERE bid = ?`, [bid], rows);
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(`deleteButtonSetByBid: ${e.message}(bid=${bid})`);
    }
  }
}

export async function fetchButtonSet(
  db: SQLiteDatabase,
  chid: number,
): Promise<Buttons[]> {
  return await db.getAllAsync<Buttons>(
    `SELECT s.bid, b.bName, s.idx
        FROM buttonSet AS s INNER JOIN button AS b ON s.bid=b.bid
        WHERE s.chid = ?
        ORDER BY idx`,
    chid,
  );
}
