import { drizzle } from "drizzle-orm/better-sqlite3";
import initSQLJs, {  Database} from "sql.js";
import * as schema from "./schema";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";





export async function getDB() {

  const sqlite =  await initSQLJs({

  });

  const ms = new sqlite.Database()

  const db = drizzle(ms, {
    schema,
  });

  migrate(db, {
    migrationsFolder: './migrations'
  })
  return db;
}
