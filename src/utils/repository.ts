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

/**
 * sql must return 1 row and 1 column.
 * @param db
 * @param sql
 * @param prm
 * @returns
 */
export async function countRows(
  db: SQLiteDatabase,
  sql: string,
  prm: any[],
): Promise<number> {
  const result = await db.getFirstAsync<Record<string, number>>(sql, prm);
  if (!result) return 0;
  const values = Object.values(result);

  if (values.length !== 1) {
    throw new Error(`countRows: expected 1 column, got ${values.length}.`);
  }

  return values[0];
}
