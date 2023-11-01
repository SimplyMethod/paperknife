import { cn } from "@/lib/utils";
import { getPosts, getPostsCount } from "@/lib/api/post";
import NewPost from "@/components/new-post";

export default async function Page() {
  const posts = await getPosts({ includeDrafts : true});
  const totalPosts = await getPostsCount({ includeDrafts: true });

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
      <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
        <header className="px-5 py-4">
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            All Orders{" "}
            <span className="text-slate-400 dark:text-slate-500 font-medium">
              442
            </span>
          </h2>
        </header>
      </div>

      <div className="mt-8 flow-root">
        <div className="mx-4 my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              {posts.length > 0 && (
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      scope="col"
                    >
                      Name
                    </th>
                    <th
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      scope="col"
                    >
                      Title
                    </th>
                    <th
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      scope="col"
                    >
                      Email
                    </th>
                    <th
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      scope="col"
                    >
                      Role
                    </th>
                    <th
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      scope="col"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {posts.map((person) => (
                    <tr key={person.email}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {person.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.role}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a
                          className="text-indigo-600 hover:text-indigo-900"
                          href="#"
                        >
                          Edit<span className="sr-only">, {person.name}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              )}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
