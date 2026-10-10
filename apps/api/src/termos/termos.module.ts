import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module.js';
import { TermoAceiteEntity } from '../database/entities/termo-aceite.entity.js';
import { TermosController } from './termos.controller.js';
import { TermosService } from './termos.service.js';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([TermoAceiteEntity])],
  controllers: [TermosController],
  providers: [TermosService],
})
export class TermosModule {}
