import { db , eq } from "@paperknife/database";
import { posts as postsTable } from "@paperknife/database/schema/post"
import type { Post } from "@paperknife/database/types";

export async function getPosts() {
  const posts = await db.query.posts.findMany({
    where: eq(postsTable.published, true)
  }) as Post[];

  return posts;
}

export async function getPost(slug: string) {
  const post = await db.query.posts.findFirst({
    where: eq(postsTable.slug, slug),
  }) as Post;

  return post;
}
