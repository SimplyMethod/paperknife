import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

if (!process.env.DATABASE_LOCAL_URL) {
  throw new Error("DATABASE_URL is not set");
}

if (!process.env.DATABASE_AUTH_TOKEN) {
  throw new Error("DATABASE_AUTH_TOKEN is not set");
}

if (!process.env.DATABASE_REMOTE_URL) {
  throw new Error("DATABASE_SYNC_URL is not set");
}

export const libsql = createClient({
  url: process.env.DATABASE_LOCAL_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
  syncUrl: process.env.DATABASE_REMOTE_URL,
});

const sync = async () => {
  try {
    await libsql.sync();
  } catch (error) {
    console.error("Error syncing database schema:", error);
  }
};

const adapter = new PrismaLibSQL(libsql);

const prismaClientSingleton = () => {
  sync();
  return new PrismaClient({
    adapter,
    log: ["query", "info", "warn", "error"],
  })
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export * from "@prisma/client";
export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
