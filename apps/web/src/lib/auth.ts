import { getServerSession, type NextAuthOptions } from "next-auth";
// import EmailProviders from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db, eq, and } from "@paperknife/database";
import { users, accounts } from "@paperknife/database/schema";

const VERCEL_DEPLOYMENT = Boolean(process.env.VERCEL_URL);

export const authOptions: NextAuthOptions = {
  adapter: getAdapter(),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      // profile(profile) {
      //   return {
      //     id: profile.id.toString(),
      //     name: profile.name || profile.login,
      //     gh_username: profile.login,
      //     email: profile.email,
      //     image: profile.avatar_url,
      //   };
      // },
    }),
    // EmailProviders({
    //   server: {
    //     host: process.env.SMTP_HOST,
    //     port: Number(process.env.SMTP_PORT),
    //     auth: {
    //       user: process.env.SMTP_USER,
    //       pass: process.env.SMTP_PASSWORD,
    //     },
    //   },
    //   from: process.env.SMTP_FROM, // The "from" address that you want to use
    // }),
  ],
  pages: {
    // signIn: "/api/auth/signin",
    // error: "/api/auth/error",
    signIn: `/login`,
    // verifyRequest: `/login`,
    // error: "/login", // Error code passed in query string as ?error=
  },
  session: { strategy: "jwt" },

  // callbacks: {
  //   async session({ token, session }) {
  //     console.log("session", session)
  //     console.log("token", token)
  //     if (token) {
  //       session.user.id = token.id;
  //       session.user.name = token.name;
  //       session.user.email = token.email;
  //       session.user.image = token.picture;
  //     }

  //     return session;
  //   },
  //   async jwt({ token, user }) {
  //     console.log("jwt", token)
  //     console.log("user", user)
  //     const [dbUser] = await db
  //       .select()
  //       .from(users)
  //       .where(eq(users.email, token.email!))
  //       .limit(1);

  //     if (!dbUser) {
  //       if (user) {
  //         token.id = user.id;
  //       }
  //       return token;
  //     }

  //     return {
  //       id: dbUser.id,
  //       name: dbUser.name,
  //       username: dbUser.username,
  //       email: dbUser.email,
  //       picture: dbUser.image,
  //     };
  //   },
  // },
};

export function getSession() {
  return getServerSession(authOptions);
}

// export function withSiteAuth(action: any) {
//   return async (
//     formData: FormData | null,
//     siteId: string,
//     key: string | null
//   ) => {
//     const session = await getSession();
//     if (!session) {
//       return {
//         error: 'Not authenticated',
//       };
//     }
//     const site = await prisma.site.findUnique({
//       where: {
//         id: siteId,
//       },
//     });
//     if (!site || site.userId !== session.user.id) {
//       return {
//         error: 'Not authorized',
//       };
//     }

//     return action(formData, site, key);
//   };
// }

function getAdapter() {
  return {
    // @ts-expect-error FIXME: when we have a better type for this
    ...DrizzleAdapter(db),
    async getUserByAccount(providerAccount: {
      provider: string;
      providerAccountId: string;
    }) {
      const results = await db
        .select()
        .from(accounts)
        .leftJoin(users, eq(users.id, accounts.userId))
        .where(
          and(
            eq(accounts.provider, providerAccount.provider),
            eq(accounts.providerAccountId, providerAccount.providerAccountId),
          ),
        )
        .get();

      return results?.user ?? null;
    },
  };
}

