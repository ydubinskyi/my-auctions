import type { Config } from "drizzle-kit";

const drizzleConfig = {
  dialect: "sqlite",
  schema: "./src/schema/*",
  out: "./drizzle",
  dbCredentials: {
    url: "./db.sqlite",
  },
} as const satisfies Config;

export default drizzleConfig;
