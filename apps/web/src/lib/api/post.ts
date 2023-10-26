import { db , eq, sql, desc } from "@paperknife/database";
import { posts as postsTable } from "@paperknife/database/schema/post"
import { insertPostSchema, type Post } from "@paperknife/database/types";
import slugify from "slugify";

export async function getPosts(includeDrafts = false): Promise<Post[]> {
  const posts = await db
    .query
    .posts
    .findMany({
      where: includeDrafts ? undefined : eq(postsTable.published, true),
      orderBy: [
        desc(postsTable.publishedAt),
        desc(postsTable.createdAt)
      ]
    });

  return posts;
}

export async function getPostsCount(includeDrafts = false): Promise<number> {
  const result = await db
  .select({
    count: sql<number>`count(*)`
  })
  .from(postsTable)
  .where(includeDrafts ? undefined : eq(postsTable.published, true));

  return result[0].count;
}

export async function getPost(slug: string) {
  const post = await db
    .query
    .posts
    .findFirst({
      where: eq(postsTable.slug, slug),
    }) as Post;

  return post;
}

export async function getPostById(id: string) {
  const post = await db
    .query
    .posts
    .findFirst({
      where: eq(postsTable.id, id),
    }) as Post;

  return post;
}

export async function addPost(post: Post) {
  if (!post.slug) {
    const existingPost = await db.query.posts.findFirst({
      where: eq(postsTable.slug, slugify(post.title) ),
    });

    if (existingPost) {
      post.slug = `${slugify(post.title)}-${Math.random().toString(36).substring(2, 7)}`;
    } else {
      post.slug = slugify(post.title);
    }
  }

  const parsedPost = insertPostSchema.safeParse(post);

  if (!parsedPost.success) {
    throw new Error(parsedPost.error.message);
  } else {
    try {
      const result = await db
        .insert(postsTable)
        .values(parsedPost.data)
        .returning({ id: postsTable.id });
      return result[0];
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export async function updatePost(post: Post) {
  if (!post.id) {
    throw new Error("Post ID is required");
  }

  const parsedPost = insertPostSchema.safeParse(post);

  if(!parsedPost.success) {
    throw new Error(parsedPost.error.message);
  } else {
    try {
      const result = await db
        .update(postsTable)
        .set(parsedPost.data)
        .where(eq(postsTable.id, post.id))
        .returning();

      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }

}
