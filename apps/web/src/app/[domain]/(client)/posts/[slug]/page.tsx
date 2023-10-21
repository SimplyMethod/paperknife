import { getPosts } from "@/lib/api/post"

export default async function Page() {
  const posts = await getPosts();

  return (
    <>
      {
        posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))
      }
    </>
  )
}
