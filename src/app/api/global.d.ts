import { PrismaClient } from '@prisma/client';

declare global {
  // Ensuring the global object can have a 'prisma' property
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
}

// This is necessary to ensure the file is treated as a module by TypeScript.
export {};