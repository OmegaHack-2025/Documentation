import { pgTable, varchar, text } from "drizzle-orm/pg-core"

export const users_summary = pgTable('users', {
  id: varchar({ length: 20 }).primaryKey(),
  academic: text(),
  psycological: text(),
  interpersonal: text(),
  physical: text(),
});
