import { cn } from "@/lib/utils";
import { getPosts } from "@/lib/api/post";
import NewPost from "./new-post";

export default async function Page() {

  const posts = await getPosts();

  return (
    <div className="flex h-24 items-center border-b border-gray-200 bg-white">
      <div className={cn("mx-auto w-full max-w-screen-xl px-2.5 lg:px-20")}>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl text-gray-600">Changelogs</h1>
          <NewPost />
        </div>
      </div>
      {
        posts.map(({ id, title }) => {
          return (
            <div key={id}>
              <h1>{title}</h1>
            </div>
          )
        })
      }
    </div>
  );
}
