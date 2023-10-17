import { headers } from 'next/headers'
import { cn } from "@/lib/utils";

const posts = [
  {
    title: 'Update your users easily.',
    href: '#',
    category: {
      name: 'Announcement', href: '#'
    },
    description:
      'Paperknife is currently in beta. We are working hard to make it ready for production. If you have any feedback, please let us know.',
    date: 'Sep 18, 2023',
    datetime: '2020-03-16',
  },
  {
    title: 'Customized your public roadmap',
    href: '#',
    category: {
      name: 'New', href: '#'
    },
    description:
      'Customize your public roadmap with your own logo and colors. You can also add a custom domain to your roadmap.',
    date: 'Sep 18, 2023',
    datetime: '2020-03-16',
  },
  {
    title: 'Collect feedback from your users',
    href: '#',
    category: {
      name: 'Partnership', href: '#'
    },
    description:
      'Collect feedback from your users with our integration with Paperknife. They can vote on features and you can keep them up to date with our changelog.',
    date: 'Sep 18, 2023',
    datetime: '2020-03-16',
  },
  {
    title: 'Say hello to Paperknife!',
    href: '#',
    category: {
      name: 'Announcement', href: '#'
    },
    description:
      'Hello world!',
    date: 'Sep 18, 2023',
    datetime: '2020-03-16',
  },
]

// translate posts to a different locale: zh-tw
const postsZhTw = [
  {
    title: '讓你的使用者不再錯過任何更新',
    href: '#',
    category: {
      name: 'Announcement', href: '#'
    },
    description:
      'Paperknife 目前正在',
    date: 'Sep 18, 2023',
    datetime: '2020-03-16',
  },
  {
    title: '自訂',
    href: '#',
    category: {
      name: 'New', href: '#'
    },
    description:
      'Customize your public roadmap with your own logo and colors. You can also add a custom domain to your roadmap.',
    date: 'Sep 18, 2023',
    datetime: '2020-03-16',
  },
  {
    title: 'Collect feedback from your users',
    href: '#',
    category: {
      name: 'Partnership', href: '#'
    },
    description:
      'Collect feedback from your users with our integration with Paperknife. They can vote on features and you can keep them up to date with our changelog.',
    date: 'Sep 18, 2023',
    datetime: '2020-03-16',
  },
  {
    title: 'Say hello to Paperknife!',
    href: '#',
    category: {
      name: 'Announcement', href: '#'
    },
    description:
      'Hello world!',
    date: 'Sep 18, 2023',
    datetime: '2020-03-16',
  },
]

function getLocales(str: string, defaultLocale: string): string[] {
  return (
    str
      .split(",")
      .map((type) => type.split(";")[0].trim().replace("*", defaultLocale))
  );
}

export default function Page() {
  const headersList = headers();
  const acceptLanguage = headersList.get('accept-language') ?? '';
  const preferredLanguage = getLocales(acceptLanguage, 'en-us');
  const contentWithPreferredLanguage = preferredLanguage[0] === 'zh-tw' ? postsZhTw : posts;

  return (
    <div className="px-0 pb-20 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-xl">
          <div className="mx-auto grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-1">
            {contentWithPreferredLanguage.map((post) => (
              <div className="flex flex-col overflow-hidden rounded-lg shadow-lg" key={post.title}>
                <div className="flex flex-1 flex-col justify-between bg-white p-6">
                  <div className="flex-1">
                    <a href={post.category.href}>
                      <span className={
                        cn(
                          'inline-block px-3 py-1 text-xs font-semibold rounded-full',
                          post.category.name === 'Announcement' && 'bg-green-100 text-green-800',
                          post.category.name === 'New' && 'bg-purple-100 text-purple-800',
                          post.category.name !== 'Announcement' && post.category.name !== 'New' && 'bg-blue-100 text-blue-800'
                        )
                      }>
                        {post.category.name}
                      </span>
                    </a>
                    <a className="mt-2 block" href={post.href}>
                      <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                      <p className="mt-3 text-base text-gray-500">{post.description}</p>
                    </a>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime={post.datetime}>{post.date}</time>
                      <span aria-hidden="true">&middot;</span>
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
