import { join } from 'node:path';
import { DataSource } from 'typeorm';

function requiredDatabaseValue(name: string): string {
  const value = process.env[name];
  if (value === undefined || (name !== 'DB_PASSWORD' && value.trim() === '')) {
    throw new Error('Database configuration is incomplete.');
  }

  return value;
}

function databasePort(): number {
  const value = process.env.DB_PORT ?? '3306';
  if (!/^[1-9]\d{0,4}$/.test(value)) {
    throw new Error('Database configuration is invalid.');
  }

  const port = Number(value);
  if (!Number.isSafeInteger(port) || port > 65_535) {
    throw new Error('Database configuration is invalid.');
  }

  return port;
}

export default new DataSource({
  type: 'mysql',
  host: requiredDatabaseValue('DB_HOST'),
  port: databasePort(),
  username: requiredDatabaseValue('DB_USER'),
  password: requiredDatabaseValue('DB_PASSWORD'),
  database: requiredDatabaseValue('DB_NAME'),
  charset: 'utf8mb4',
  timezone: 'Z',
  synchronize: false,
  migrationsRun: false,
  migrationsTableName: 'typeorm_migrations',
  logging: false,
  entities: [join(__dirname, 'entities', '*.entity.js')],
  migrations: [join(__dirname, 'migrations', '*.js')],
});
