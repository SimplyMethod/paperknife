import {getServerSession, type NextAuthOptions} from 'next-auth';
import EmailProviders from 'next-auth/providers/email';
import {DrizzleAdapter} from '@auth/drizzle-adapter';
import {db} from 'database/schema';
const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

export const authOptions: NextAuthOptions = {
  providers: [
    EmailProviders({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.SMTP_FROM, // The "from" address that you want to use
    }),
  ],
  pages: {
    // signIn: "/api/auth/signin",
    // error: "/api/auth/error",
    signIn: `/login`,
    // verifyRequest: `/login`,
    // error: "/login", // Error code passed in query string as ?error=
  },
  adapter: DrizzleAdapter(db),
  session: {strategy: 'jwt'},
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
        domain: VERCEL_DEPLOYMENT
          ? `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
          : undefined,
        secure: VERCEL_DEPLOYMENT,
      },
    },
  },
  callbacks: {
    jwt: async ({token, user}) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({session, token}) => {
      // const user = await prisma.user.findUnique({
      //   where: {
      //     id: token?.user?.id,
      //   },
      // });

      // session.user = {
      //   ...session.user,
      //   stripeAccountId: user?.stripeAccountId as string,
      // };

      return session;
    },
  },
  events: {},
};

export function getSession() {
  return getServerSession(authOptions) as Promise<{
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      stripeAccountId: string;
      stripeCustomerId: string;
      businessType: string;
      businessName: string;
      firstName: string;
      lastName: string;
    };
  } | null>;
}

export function withSiteAuth(action: any) {
  return async (
    formData: FormData | null,
    siteId: string,
    key: string | null
  ) => {
    const session = await getSession();
    if (!session) {
      return {
        error: 'Not authenticated',
      };
    }
    const site = await prisma.site.findUnique({
      where: {
        id: siteId,
      },
    });
    if (!site || site.userId !== session.user.id) {
      return {
        error: 'Not authorized',
      };
    }

    return action(formData, site, key);
  };
}
