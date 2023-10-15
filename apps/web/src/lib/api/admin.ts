import prismaAdmin from "@paperknife/database";
import type { Post } from "@prisma/client";

export async function addPost(post: Post) {
  const {
    title,
    content,
  } = post;

  const response = await prismaAdmin.post.create({
    data: {
      title,
      content,
    }
  });

  return response

}
