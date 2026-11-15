import { SQLiteDatabase } from "expo-sqlite";

import type { Tags } from "@/data/types";
import { runQuery } from "@/utils/repository";
import { deleteComboSetByTid } from "./comboSet";

export async function insertTag(
  db: SQLiteDatabase,
  tName: string,
  type: number,
) {
  try {
    await runQuery(db, `INSERT INTO tag(tName, type) VALUES (?, ?)`, [
      tName,
      type,
    ]);
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(`insertTag: ${e.message}(tName=${tName}, type=${type})`);
    }
  }
}

export async function updateTag(
  db: SQLiteDatabase,
  newName: string,
  tid: number,
) {
  try {
    await runQuery(db, `UPDATE tag SET tName = ? WHERE tid = ?`, [
      newName,
      tid,
    ]);
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(`updateTag: ${e.message}(tid=${tid})`);
    }
  }
}

export async function deleteTag(db: SQLiteDatabase, tid: number) {
  try {
    await runQuery(db, `DELETE FROM tag WHERE tid = ?`, [tid]);
    await deleteComboSetByTid(db, tid);
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(`deleteTag: ${e.message}(tid=${tid})`);
    }
  }
}

export async function fetchTagList(
  db: SQLiteDatabase,
): Promise<Pick<Tags, "tid" | "tName" | "type">[]> {
  return await db.getAllAsync<Pick<Tags, "tid" | "tName" | "type">>(
    `SELECT tid, tName, type FROM tag`,
  );
}
