'use client';

import { useMemo } from "react";
import { usePathname, useParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils"

const TabsHelper = (workspace, pathname) => {
  const { postId } = pathname as {
    postId?: string;
  };

  if (postId) {
    return [
      {
        name: "Details",
        href: `/console/posts/${postId}`,
      },
      {
        name: "Edit",
        href: `/console/posts/${postId}/edit`,
      },
    ];
  }


  if (workspace) {
    const pathPrefix = workspace as string;

    // TODO: generate tabs for new post editor
    if (pathname === `/${workspace}/posts/new`) {
      return [{ name: "< Back", href: `/${pathPrefix}/posts` }];
    }

    return [
      { name: "Posts", href: `/${pathPrefix}/posts` },
      { name: "Roadmap", href: `/${pathPrefix}/roadmap` },
      { name: "Feedback", href: `/${pathPrefix}/feedback` },
      { name: "Settings", href: `/${pathPrefix}/settings` },
    ];
  }

  return [
    { name: "Posts", href: "/posts" },
    { name: "Roadmap", href: "/roadmap" },
    { name: "Feedback", href: "/feedback" },
    { name: "Settings", href: "/settings" },
  ];
};


export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const { workspace } = useParams();

  const tabs = useMemo(() => {
    if (!pathname) return [];
    return TabsHelper(workspace, pathname);
  }, [workspace, pathname]);

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {tabs.map(({ name, href }) => (
        <Link
          className={cn(
            "px-3 py-1.5 border-b-2 text-sm font-medium transition-colors",
            pathname === href
              ? "border-black text-black"
              : "border-transparent text-gray-600 hover:text-black",
          )}
          href={href}
          key={href}
        >
          <div className="rounded-md px-3 py-2 transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
            <p className="text-sm">{name}</p>
          </div>
        </Link>
      ))}
    </nav>
  );
}
