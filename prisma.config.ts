import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  // Generation/build do not need credentials; migrations require the direct URL.
  datasource: { url: process.env.DIRECT_URL ?? "" },
});
