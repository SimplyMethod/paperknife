import { db , eq, sql } from "@paperknife/database";
import { posts as postsTable } from "@paperknife/database/schema/post"
import type { Post } from "@paperknife/database/types";

export async function getPosts() {
  const posts = await db.query.posts.findMany({
    where: eq(postsTable.published, true)
  }) as Post[];

  return posts;
}

export async function getPostsCount(): Promise<number> {
  const result = await db.select({
    count: sql<number>`count(*)`
  }).from(postsTable);

  return result[0].count as number;
}

export async function getPost(slug: string) {
  const post = await db.query.posts.findFirst({
    where: eq(postsTable.slug, slug),
  }) as Post;

  return post;
}
