import type { Buttons } from "@/data/types";
import { runQuery } from "@/utils/repository";
import { SQLiteDatabase } from "expo-sqlite";
import { deleteButtonSetByBid } from "./buttonSet";
import { deletePresetByBid } from "./presets";

export async function insertButton(db: SQLiteDatabase, newButtonName: string) {
  try {
    await runQuery(db, `INSERT INTO button(bName) VALUES(?)`, [newButtonName]);
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(`insertButton: ${e.message}(bName=${newButtonName})`);
    }
    throw e;
  }
}

export async function updateButton(
  db: SQLiteDatabase,
  btn: Buttons,
  newButtonName: string,
) {
  try {
    await runQuery(db, `UPDATE button SET bName=? WHERE bid=?`, [
      newButtonName,
      btn.bid,
    ]);
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(`updateButton: ${e.message}(bid=${btn.bid})`);
    }
    throw e;
  }
}

export async function deleteButton(
  db: SQLiteDatabase,
  bid: number,
  bName: string,
) {
  try {
    await db.withTransactionAsync(async () => {
      await runQuery(db, `DELETE FROM button WHERE bid=? AND bName=?`, [
        bid,
        bName,
      ]);
      await deleteButtonSetByBid(db, bid);
      await deletePresetByBid(db, bid);
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(`deleteButton: ${e.message}(bid=${bid}, bName=${bName})`);
    }
  }
}

export async function fetchButtonList(
  db: SQLiteDatabase,
): Promise<Pick<Buttons, "bid" | "bName">[]> {
  return await db.getAllAsync<Pick<Buttons, "bid" | "bName">>(
    `SELECT bid, bName FROM button ORDER BY bid`,
  );
}
