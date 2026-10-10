import { join } from 'node:path';
import type { DataSourceOptions } from 'typeorm';
import { ProfissionalPerfilEntity } from './entities/profissional-perfil.entity.js';
import { ProfissionalServicoEntity } from './entities/profissional-servico.entity.js';
import { UsuarioEntity } from './entities/usuario.entity.js';

function requiredDatabaseValue(name: string): string {
  const value = process.env[name];
  if (name === 'DB_PASSWORD') {
    return value ?? '';
  }

  if (value === undefined || value.trim() === '') {
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

export function isDatabaseRuntimeConfigured(
  environment: NodeJS.ProcessEnv = process.env,
): boolean {
  return Boolean(
    environment.DB_HOST?.trim() &&
      environment.DB_USER?.trim() &&
      environment.DB_NAME?.trim(),
  );
}

export function isAuthRuntimeConfigured(
  environment: NodeJS.ProcessEnv = process.env,
): boolean {
  return (
    isDatabaseRuntimeConfigured(environment) &&
    Boolean(environment.AUTH_TOKEN_SECRET && environment.AUTH_TOKEN_SECRET.length >= 32)
  );
}

export function databaseRuntimeOptions(): DataSourceOptions {
  return {
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
    entities: [UsuarioEntity, ProfissionalPerfilEntity, ProfissionalServicoEntity],
  };
}

export function databaseCliOptions(): DataSourceOptions {
  return {
    ...databaseRuntimeOptions(),
    entities: [join(__dirname, 'entities', '*.entity.js')],
    migrations: [join(__dirname, 'migrations', '*.js')],
  };
}
