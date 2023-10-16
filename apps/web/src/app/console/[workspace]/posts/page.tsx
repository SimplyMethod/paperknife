import { cn } from "@/lib/utils";
import { getPosts, getPostsCount } from "@/lib/api/post";
import NewPost from "./new-post";

export default async function Page() {
  const posts = await getPosts();
  const totalPosts = await getPostsCount();

  return (
    <>
      <div className="flex h-24 items-center border-b border-gray-200 bg-white">
        <div className={cn("mx-auto w-full max-w-screen-xl px-2.5 lg:px-20")}>
          <div className="flex items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl text-gray-600">Posts</h1>
              <p className="mt-2 text-sm text-gray-700">
                Changelog, announcements, and more.
                {totalPosts === 0
                  ? ` No posts yet.`
                  : `${totalPosts} post${totalPosts > 1 ? "s" : ""}.`}
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <NewPost />
            </div>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "mx-auto w-full max-w-screen-xl px-2.5 pt-20 lg:px-20",
          "flex items-center",
        )}
      >
        {posts.length === 0 && (
          <div className="flex items-center justify-center flex-1">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex-shrink-0">
                <svg
                  className="h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <p className="text-gray-500 text-sm">No posts yet.</p>
            </div>
          </div>
        )}
        {posts.length > 0 &&
          posts.map(({ id, title }) => {
            return (
              <div key={id}>
                <h1>{title}</h1>
              </div>
            );
          })}
      </div>
    </>
  );
}
