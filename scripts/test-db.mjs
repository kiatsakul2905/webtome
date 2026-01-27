import { sql } from '../lib/db.ts';

async function testConnection() {
  try {
    const result = await sql`SELECT 1`;
    console.log('Database connection successful:', result);
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

testConnection();
