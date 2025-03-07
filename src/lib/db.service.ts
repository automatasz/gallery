import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { type Image, imagesTable, type NewImage } from "~/lib/db/schema";
import { eq } from "drizzle-orm";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });

export async function insertImage(image: NewImage) {
  return db.insert(imagesTable).values(image).returning();
}

export async function updateImage(id: Image["id"], image: Partial<Image>) {
  return db.update(imagesTable).set(image).where(eq(imagesTable.id, id));
}

export async function findImage(path: string) {
  return db.select().from(imagesTable).where(eq(imagesTable.path, path));
}

export async function getImages() {
  return db.select().from(imagesTable).where(eq(imagesTable.category, "public"));
}
