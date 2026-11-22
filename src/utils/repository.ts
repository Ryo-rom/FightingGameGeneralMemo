import { SQLiteDatabase } from "expo-sqlite";

/**
 *
 * @param db
 * @param sql
 * @param prm
 * @param n how many rows to change
 */
export async function runQuery(
  db: SQLiteDatabase,
  sql: string,
  prm: any[],
  n: number = 1,
) {
  const result = await db.runAsync(sql, prm);

  if (result.changes !== n) {
    throw new Error(
      `expected ${n} row to change, but ${result.changes} rows changed)`,
    );
  }
}

export async function countRows(
  db: SQLiteDatabase,
  sql: string,
  prm: any[],
): Promise<number> {
  const result = await db.getFirstAsync<{ n: number }>(sql, prm);
  return result?.n ?? 0;
}
