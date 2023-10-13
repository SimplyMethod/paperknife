import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";
import { performance } from "perf_hooks";
import * as util from "util";

if (!process.env.DATABASE_AUTH_TOKEN) {
  throw new Error("DATABASE_AUTH_TOKEN is not set");
}

if (!process.env.DATABASE_REMOTE_URL) {
  throw new Error("DATABASE_SYNC_URL is not set");
}

export const libsql = createClient({
  url: process.env.DATABASE_REMOTE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

const adapter = new PrismaLibSQL(libsql);

const prismaClientSingleton = () => {
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

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prismaAdmin: PrismaClientSingleton | undefined;
};
const prisma = globalForPrisma.prismaAdmin ?? prismaClientSingleton();

export * from "@prisma/client";
export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prismaAdmin = prisma;
