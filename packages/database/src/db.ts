import { drizzle } from "drizzle-orm/libsql";
import * as schema from "../schema";
import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN,
  syncUrl: process.env.DATABASE_SYNC_URL,
});

export const db = drizzle(client, { schema });
