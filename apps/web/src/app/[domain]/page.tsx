import { db } from '@paperknife/database';

export default async function Page() {

  const posts = await db.query.posts.findMany({
    with: {
      postTags: {
        with: {
          tag: true
        }
      }
    },
  });

  return (
    <>
      {
        posts.map((post, idx) => {
          return (
            <div key={idx}>
              <h1>{post.title}</h1>
              <p>{post.body}</p>
              <p>{
                post.postTags.map((postTag, idx) => {
                  return (
                    <span key={idx} className="inline-flex items-center rounded-md bg-red-100 mx-1 px-2 py-1 text-xs font-medium text-gray-600">{postTag.tag.name}</span>
                  )
                })}
              </p>
            </div>
          )
        })
      }
    </>
  )
}
