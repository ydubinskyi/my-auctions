import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import drizzleConfig from "../../drizzle.config";



export const connection = new Database(drizzleConfig.dbCredentials.url);
export const db = drizzle(connection);
