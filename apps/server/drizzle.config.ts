import process from 'node:process'
import type { Config } from 'drizzle-kit'

export default {
  schema: './src/schema/*',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_URL,
  },
} satisfies Config
