/// <reference types="node" />

import "dotenv/config";
import { defineConfig } from "prisma/config";
console.log("config.ts")
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
