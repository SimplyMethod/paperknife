import { createInsertSchema } from "drizzle-zod";
import { posts as postsTable } from "./schema/post";
export const insertPostSchema = createInsertSchema(postsTable);
export interface Post {
  id?: string;
  title: string;
  slug?: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  published?: boolean;
  publishedAt?: Date | null;
}

export interface Tag {
  id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Setting {
  id?: string;
  key: string;
  value: string;
  updatedAt?: Date;
}


