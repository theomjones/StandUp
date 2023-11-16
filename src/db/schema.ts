import { integer, sqliteTable, text, customType } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import dayjs from "dayjs";

const dayjsType = customType<{ data: dayjs.Dayjs }>({
  dataType: () => "text",
  toDriver: (val) => val.format("YYYY-MM-DD HH:mm:ss"),
  fromDriver: (val) => dayjs(val as string),
});

export const entries = sqliteTable("entries", {
  id: text("id").notNull().primaryKey(),
  note: text("note").notNull(),
  description: text("description"),
  cool: dayjsType("cool"),
  timestamp: integer("timestamp", {
    mode: "timestamp",
  })
    .$default(() => new Date())
    .notNull(),
  createdAt: text("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text("updatedAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export type EntryInput = typeof entries.$inferInsert;
