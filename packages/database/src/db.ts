import { drizzle } from "drizzle-orm/libsql";
import * as schema from "../schema";
import { createClient } from "@libsql/client";
// import * as dotenv from "dotenv";

// dotenv.config({
//   path: "../../.env",
// });


console.log("===================================================");
console.log("DATABASE_URL", process.env.DATABASE_URL);
console.log("===================================================");

const client = createClient({
  url: process.env.DATABASE_URL || "",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });
