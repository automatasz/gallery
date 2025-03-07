import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const imagesTable = pgTable("images", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  path: text().notNull().unique(),
  url: text().notNull().unique(),
  alt: text().notNull(),
  category: text(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type NewImage = typeof imagesTable.$inferInsert;

export type Image = typeof imagesTable.$inferSelect;
