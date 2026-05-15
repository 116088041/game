import { drizzle } from 'drizzle-orm/mysql2';
import * as schema from './schema';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require('mysql2/promise');

let db: ReturnType<typeof drizzle<typeof schema>> | null = null;
let dbAvailable = true;

export const getDb = () => {
  if (db) return db;
  if (!dbAvailable) return null;

  try {
    const host = process.env.MYSQL_HOST || 'localhost';
    const port = parseInt(process.env.MYSQL_PORT || '3306', 10);
    const user = process.env.MYSQL_USER || 'root';
    const password = process.env.MYSQL_PASSWORD || '';
    const database = process.env.MYSQL_DATABASE || 'game';

    const pool = mysql.createPool({ host, port, user, password, database, waitForConnections: true, connectTimeout: 3000 });
    db = drizzle(pool, { schema, mode: 'default' }) as any;
    return db;
  } catch {
    dbAvailable = false;
    return null;
  }
};

export const isDbAvailable = () => dbAvailable && !!db;
