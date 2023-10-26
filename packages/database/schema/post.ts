import { sql } from "drizzle-orm";
import {
  integer,
  sqliteTable,
  text,
  primaryKey,
  unique,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

export const posts = sqliteTable(
  "posts",
  {
    id: text("id")
      .$defaultFn(() => createId())
      .notNull()
      .primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull(),
    content: text("content").notNull(),
    published: integer("published", { mode: "boolean" }).notNull().default(false),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(strftime('%s', 'now'))`),
    publishedAt: integer("published_at", { mode: "timestamp" })
      .default(sql`(strftime('%s', 'now'))`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(strftime('%s', 'now'))`),
  },
  (posts) => ({
    unq: unique().on(posts.slug),
  }),
);

export const postsRelations = relations(posts, ({ many }) => ({
  postTags: many(postsToTags),
}));

export const tags = sqliteTable("tags", {
  id: text("id")
    .$defaultFn(() => createId())
    .notNull()
    .primaryKey(),
  name: text("name"),
  slug: text("slug"),
  pinned: integer("pinned", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`,
  ),
});

export const tagsRelations = relations(tags, ({ many }) => ({
  postsToTags: many(postsToTags),
}));

export const postsToTags = sqliteTable(
  "postsToTags",
  {
    postId: text("post_id")
      .notNull()
      .references(() => posts.id),
    tagId: text("tag_id")
      .notNull()
      .references(() => tags.id),
  },
  (t) => ({
    pk: primaryKey(t.postId, t.tagId),
  }),
);

export const postsToTagsRelations = relations(postsToTags, ({ one }) => ({
  post: one(posts, {
    fields: [postsToTags.postId],
    references: [posts.id],
  }),
  tag: one(tags, {
    fields: [postsToTags.tagId],
    references: [tags.id],
  }),
}));
