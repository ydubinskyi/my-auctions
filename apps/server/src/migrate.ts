import { migrate } from "drizzle-orm/postgres-js/migrator";

import { drizzle } from "drizzle-orm/postgres-js";
import drizzleConfig from "../drizzle.config";
import "dotenv/config";
import { db, connection } from "./utils/db";

async function main() {
  // This will run migrations on the database, skipping the ones already applied
  await migrate(drizzle(db), { migrationsFolder: drizzleConfig.out });

  connection.close();
}

main();
