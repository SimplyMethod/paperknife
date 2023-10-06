import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({
  path: "../../.env",
});

export default {
  schema: "./schema/index.ts",
  out: "./migrations",
  driver: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN,
    syncUrl: process.env.DATABASE_SYNC_URL,
  },
  strict: true,
} satisfies Config;
