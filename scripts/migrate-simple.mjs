import { getMigrations } from 'better-auth/db';
import { betterAuth } from 'better-auth';
import { SqliteDialect } from 'kysely';
import Database from 'better-sqlite3';

// Create the same configuration as in auth.ts
const dialect = new SqliteDialect({ database: new Database('./auth.db') });

const authConfig = {
  appName: "Better Auth Demo",
  baseURL: "http://localhost:3000",
  database: {
    dialect,
    type: "sqlite",
  },
  emailAndPassword: {
    enabled: true,
  },
};

async function runMigrations() {
  try {
    console.log('Running database migrations...');
    const { runMigrations } = await getMigrations(authConfig);
    await runMigrations();
    console.log('✅ Database migrations completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();
