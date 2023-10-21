import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { Post } from "./types";
import { faker } from "@faker-js/faker";
import { createId } from "@paralleldrive/cuid2";
import { posts as postsTable } from "./schema/post";

const client = createClient({
  url: process.env.DATABASE_URL as string,
  authToken: process.env.DATABASE_AUTH_TOKEN as string,
})

const db = drizzle(client);

async function cleanup() {
  await db.delete(postsTable);
  process.exit(0);
}

async function seed() {

  const posts: Post[] = [];

  for (let i = 0; i < 30; i++) {
    const published = faker.datatype.boolean(0.75);

    const post: Post = {
      id: createId(),
      title: faker.lorem.sentence(),
      slug: faker.lorem.slug(),
      content: faker.lorem.paragraphs(),
      published,
      publishedAt: published ? faker.date.past() : undefined,
    };

    posts.push(post);
  }

  const result = await db
    .insert(postsTable)
    .values(posts)
    .returning()
    .all();

  console.log(result);

  process.exit(0);
}

cleanup();
seed();
