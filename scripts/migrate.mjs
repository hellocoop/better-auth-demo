import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Import the auth configuration
const { auth } = await import('../lib/auth.ts');

async function runMigrations() {
  try {
    console.log('Running database migrations...');
    await auth.runMigrations();
    console.log('✅ Database migrations completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();
