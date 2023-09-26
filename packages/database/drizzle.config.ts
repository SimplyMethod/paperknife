import * as dotenv from 'dotenv';

dotenv.config({
  path: '../../.env',
});

import type { Config } from 'drizzle-kit';

export default {
  schema: './schema/index.ts',
  out: './migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL || '',
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
  driver: 'turso',
  strict: true,
} satisfies Config;
