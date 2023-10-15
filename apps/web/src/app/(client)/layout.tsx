import type { ReactNode } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const tabs = [
  { name: 'Changelog', href: '/changelog', current: true },
  { name: 'Roadmap', href: '/roadmap', current: false },
  { name: 'Feature Requests', href: '/feature-request', current: false },
]

export default async function SiteLayout({
  params,
  children,
}: {
  params: { domain: string };
  children: ReactNode;
}) {
  // const { domain } = params;
  // const data = await getSiteData(domain);

  // if (!data) {
  //   notFound();
  // }

  // Optional: Redirect to custom domain if it exists
  // if (
  //   domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
  //   data.customDomain &&
  //   process.env.REDIRECT_TO_CUSTOM_DOMAIN_IF_EXISTS === "true"
  // ) {
  //   return redirect(`https://${data.customDomain}`);
  // }

  return (
    <div className="py-8 bg-gray-50">
        <div className="pb-5" id="header">
          <div className="px-8">
            <h3 className="text-base font-semibold leading-6 text-gray-900 just">What's new?</h3>
            <p className="mt-2 max-w-4xl text-sm text-gray-500">
              We're currently working on the following features. If you have any suggestions, please let us know!
            </p>
          </div>
          <div className="mt-4 w-full bg-gray-100 py-4 px-8 border-b border-t">
            <div className="flex items-center">
              <nav className="flex space-x-8 md:mx-auto">
                {tabs.map((tab) => (
                  <a
                    aria-current={tab.current ? 'page' : undefined}
                    className={classNames(
                      tab.current
                        ? 'border-slate-500 text-slate-800'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                      'whitespace-nowrap border-b-2 px-1 pb-2 text-sm'
                    )}
                    href={tab.href}
                    key={tab.name}
                  >
                    {tab.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="mx-0" id="main-content">
          {children}
        </div>
      </div>
  );
}


