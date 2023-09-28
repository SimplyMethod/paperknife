import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({
  path: "../../.env",
});

export default {
  schema: "./schema/index.ts",
  out: "./migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
  driver: "turso",
  strict: true,
} satisfies Config;
