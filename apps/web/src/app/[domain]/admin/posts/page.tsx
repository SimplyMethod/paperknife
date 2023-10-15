import prisma from '@paperknife/database';

export default async function Page() {

  const posts = await prisma.post.findMany();

  return (
    <div>
      <h1>Posts</h1>

      {
        posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))
      }
    </div>
  )
}
