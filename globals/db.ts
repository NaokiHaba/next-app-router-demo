// サーバー側のみで使うコードがクライアント側にも含まれてしまうのを防ぐ
import "server-only"

import { PrismaClient } from "@prisma/client";


const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({
    // 全てのクエリをログに出力する
    log: [ "query" ],
});

// https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}