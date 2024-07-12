// import { db } from '@paperknife/database';

export default async function Page() {

  // const posts = await db.query.posts.findMany();

  return (
    <div>
      <h1>Posts</h1>

      {
        posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))
      }
    </div>
  )
}
