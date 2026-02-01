"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
require("dotenv/config");
// IMPORTANT: import PrismaClient from your generated output if you changed generator output.
// If you did NOT change output, keep:  import { PrismaClient } from "@prisma/client";
const client_1 = require("@prisma/client");
const adapter_neon_1 = require("@prisma/adapter-neon");
const adapter = new adapter_neon_1.PrismaNeon({
    connectionString: process.env.DATABASE_URL,
});
exports.prisma = new client_1.PrismaClient({ adapter });
//# sourceMappingURL=prisma.js.map