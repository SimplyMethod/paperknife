import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { UserProps } from "./lib/types";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const hostname = req.headers
    .get("host")
    ?.replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  const path = url.pathname;

  if (hostname === `console.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    let isAdmin = false;

    const session = (await getToken({ req, secret: process.env.NEXTAUTH_SECRET })) as {
      id?: string;
      email?: string;
      user?: UserProps
    } | undefined;

    if (!session && path !== "/login") {
      return NextResponse.redirect(new URL("/login", req.url));
    } else if (session && path === "/login") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if(session?.email === process.env.ADMIN_EMAIL)
      isAdmin = true;

    // TODO: strong typing for env var: MULTI_TENANT
    // if (process.env.MULTI_TENANT === undefined || process.env.MULTI_TENANT === "false") {
    //   if (session?.email !== process.env.ADMIN_EMAIL) {
    //     return NextResponse.redirect(new URL("/api/auth/signout", req.url));
    //   }
    // }

    if (session?.email && isAdmin) {
      return NextResponse.rewrite(
        new URL(`/console${path === "/" ? "" : path}`, req.url),
      );
    }

    return NextResponse.rewrite(
      new URL(`/console${path === "/" ? "" : path}`, req.url),
    );

  }

  if (
    hostname === "localhost:3000" ||
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    return NextResponse.rewrite(new URL(`/home${path}`, req.url));
  }

  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}
