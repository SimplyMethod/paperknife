import Link from "next/link";
import { formatRelative } from "date-fns";
import { getPosts } from "@/lib/api/post";

export default async function Page() {
  const posts = await getPosts();

  return (
    <div className="px-0 pb-20 lg:px-8 lg:pb-28">
      <div className="mx-auto max-w-xl">
        <div className="mx-auto grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-1">
          {posts.map(({ title, content, slug, publishedAt }) => (
            <div
              className="flex flex-col overflow-hidden rounded-lg shadow-lg"
              key={title}
            >
              <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                  <Link className="mt-2 block" href={`/posts/${slug}`}>
                    <p className="text-xl font-semibold text-gray-900">
                      {title}
                    </p>
                    <p className="mt-3 text-base text-gray-500">{content}</p>
                  </Link>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex space-x-1 text-sm text-gray-400">
                    {publishedAt ? (
                      <time dateTime={publishedAt.toISOString()}>
                        {formatRelative(publishedAt, new Date())}
                      </time>
                    ) : null}
                    {/* <span aria-hidden="true">&middot;</span> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
