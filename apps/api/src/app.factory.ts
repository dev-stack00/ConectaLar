import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { SafeExceptionFilter } from './common/filters/safe-exception.filter.js';

export async function createApp() {
  const app = await NestFactory.create(AppModule, { logger: false });
  app.enableCors({
    origin: corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type', 'Accept'],
  });
  app.useGlobalFilters(new SafeExceptionFilter());
  return app;
}

function corsOrigin(
  origin: string | undefined,
  callback: (error: Error | null, allow?: boolean) => void,
): void {
  if (origin === undefined) {
    callback(null, true);
    return;
  }

  if (process.env.NODE_ENV !== 'production' && isLocalOrigin(origin)) {
    callback(null, true);
    return;
  }

  const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  callback(null, allowedOrigins.includes(origin));
}

function isLocalOrigin(origin: string): boolean {
  try {
    const url = new URL(origin);
    return ['localhost', '127.0.0.1', '10.0.2.2'].includes(url.hostname);
  } catch {
    return false;
  }
}
