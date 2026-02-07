import { defineConfig, env } from "prisma/config";
import * as dotenv from "dotenv";

dotenv.config();
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    seed: "node ./prisma/seed.ts",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
