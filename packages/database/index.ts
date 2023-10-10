import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";
import { performance } from "perf_hooks";
import * as util from "util";

const prismaGlobal = global as typeof global & {
  prisma?: PrismaClient;
};

if(!process.env.DATABASE_LOCAL_URL) {
  throw new Error("DATABASE_URL is not set");
}

if(!process.env.DATABASE_AUTH_TOKEN) {
  throw new Error("DATABASE_AUTH_TOKEN is not set");
}

if(!process.env.DATABASE_REMOTE_URL) {
  throw new Error("DATABASE_SYNC_URL is not set");
}

export const libsql = createClient({
  // @ts-expect-error
  url: process.env.DATABASE_REMOTE_UR,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

// Sync the database schema
const sync = async () => {
  try {
    await libsql.sync();
  } catch (error) {
    console.error("Error syncing database schema:", error);
  }
};

// Create a Prisma "adapter" for libSQL
const adapter = new PrismaLibSQL(libsql);
// Pass the adapter option to the Prisma Client instance

const prismaClientSingleton = () => {
  sync();
  return new PrismaClient({
    adapter,
    log: ["query", "info", "warn", "error"],
  }).$extends({
    /**
     * Query logging Client extension
     * Source: https://github.com/prisma/prisma-client-extensions/tree/main/query-logging
     */
    query: {
      $allModels: {
        async $allOperations({ operation, model, args, query }) {
          const start = performance.now();
          const result = await query(args);
          const end = performance.now();
          const time = end - start;
          console.log(
            util.inspect(
              { model, operation, time, args },
              { showHidden: false, depth: null, colors: true },
            ),
          );
          return result;
        },
      },
    },
  });
};

// const prisma = prismaGlobal.prisma ?? prismaClientSingleton();
const prisma = prismaClientSingleton();

// const prisma: PrismaClient =
//   prismaGlobal.prisma || new PrismaClient({
//     adapter,
//     log: ['query', 'info', 'warn', 'error'],
//   });
// const prisma: PrismaClient =
//   prismaGlobal.prisma ?? prismaSingleton();

export default prisma;
export * from "@prisma/client";
if (process.env.NODE_ENV !== "production") prismaGlobal.prisma = prisma;
