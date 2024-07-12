import Link from "next/link";
import { getPosts } from "@/lib/api/post";

export default async function Page() {
  const posts = await getPosts();

  return (
    <>
      {posts.map(({ id, title, slug, content }) => {
        return (
          <div key={id}>
            <h1>{title}</h1>
            <p>{content}</p>
            <Link href={`/posts/${slug}`}>Read more</Link>
          </div>
        );
      })}
    </>
  );
}
