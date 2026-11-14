import type { Characters } from "@/data/types";
import { runQuery } from "@/utils/repository";
import { SQLiteDatabase } from "expo-sqlite";

export async function insertCharacter(
  db: SQLiteDatabase,
  newCharacterName: string,
) {
  try {
    await runQuery(db, `INSERT INTO character(cName) VALUES (?)`, [
      newCharacterName,
    ]);
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(
        `insertCharacter: ${e.message}(cName=${newCharacterName})`,
      );
    }
    throw e;
  }
}

export async function updateCharacter(
  db: SQLiteDatabase,
  ch: Characters,
  reName: string,
) {
  try {
    await runQuery(db, `UPDATE character SET cName=? WHERE chid=?`, [
      reName,
      ch.chid,
    ]);
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(`updateCharacter: ${e.message}(chid=${ch.chid})`);
    }
    throw e;
  }
}

export async function deleteCharacter(db: SQLiteDatabase, ch: Characters) {
  try {
    await runQuery(db, `DELETE FROM character WHERE chid=? AND cName=?`, [
      ch.chid,
      ch.cName,
    ]);
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(`deleteCharacter: ${e.message}(chid=${ch.chid})`);
    }
    throw e;
  }
}

export async function fetchCharacterList(
  db: SQLiteDatabase,
): Promise<Characters[]> {
  return await db.getAllAsync<Characters>(
    `SELECT chid, cName FROM character ORDER BY chid DESC`,
  );
}
