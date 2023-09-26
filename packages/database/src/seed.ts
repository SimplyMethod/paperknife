import { db } from './db';
import { posts, tags, postsToTags }  from '../schema';
import { faker } from "@faker-js/faker";

export interface Post {
  id: string;
  title: string;
  slug: string;
  body: string;
}

export default async function seed() {

  const fakeTags = Array.from({ length: faker.number.int(50) }).map(() => ({
    name: faker.lorem.word(),
    slug: faker.lorem.slug(),
  }));

  const tagInsertResult = await db
    .insert(tags)
    .values(fakeTags)
    .returning({ tagId: tags.id })
    .run();

  const fakePosts = Array.from({ length: faker.number.int(50) }).map(() => ({
    title: faker.lorem.sentence(),
    slug: faker.lorem.slug(),
    body: faker.lorem.paragraphs(),
  }));

  const postInsertResult = await db
    .insert(posts)
    .values(fakePosts)
    .returning({ postId: posts.id })
    .run();

  postInsertResult.rows.forEach((post) => {

    const shuffled = tagInsertResult.rows.sort(() => 0.5 - Math.random());
    const randomTags = shuffled.slice(0, faker.number.int(10));

    randomTags.forEach(async (tag) => {

      if (!post.id || !tag.id) return;


      await db.insert(postsToTags).values({
        postId: post.id as string,
        tagId: tag.id as string,
      }).run();

    });
  })
}

seed();
