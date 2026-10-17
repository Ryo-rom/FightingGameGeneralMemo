import { SQLiteDatabase } from "expo-sqlite";
import { INIT_DB } from "./scheme";
const DB_VERSION = 1;

export async function initializeDB(db: SQLiteDatabase) {
  const row = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version",
  );
  let current = row?.user_version ?? 0;
  if (current >= DB_VERSION) return;

  if (current === 0) {
    await db.execAsync(INIT_DB);
    current = 1;
  }

  await db.execAsync(`PRAGMA user_version = ${DB_VERSION}`);
}
