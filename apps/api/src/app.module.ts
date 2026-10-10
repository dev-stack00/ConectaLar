import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module.js';
import {
  databaseRuntimeOptions,
  isAuthRuntimeConfigured,
} from './database/database.config.js';
import { HealthController } from './health/health.controller.js';
import { ProfissionaisModule } from './profissionais/profissionais.module.js';

const runtimeImports = isAuthRuntimeConfigured()
  ? [TypeOrmModule.forRoot(databaseRuntimeOptions()), AuthModule, ProfissionaisModule]
  : [];

@Module({
  imports: runtimeImports,
  controllers: [HealthController],
})
export class AppModule {}
