import "dotenv/config";

// IMPORTANT: import PrismaClient from your generated output if you changed generator output.
// If you did NOT change output, keep:  import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });
