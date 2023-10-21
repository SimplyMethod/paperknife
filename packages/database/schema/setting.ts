import { sql } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  unique
} from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";

export const settings = sqliteTable(
  "settings",
  {
    id: text("id")
      .$defaultFn(() => createId())
      .notNull()
      .primaryKey(),
    key: text("key"),
    value: text("value"),
    updatedAt: integer("updated_at", { mode: "timestamp" }).default(
      sql`(strftime('%s', 'now'))`,
    ),
  },
  (settings) => ({
    unq: unique().on(settings.key)
  }),
);
