import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { SafeExceptionFilter } from './common/filters/safe-exception.filter.js';

export async function createApp() {
  const app = await NestFactory.create(AppModule, { logger: false });
  app.useGlobalFilters(new SafeExceptionFilter());
  return app;
}
