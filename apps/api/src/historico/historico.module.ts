import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module.js';
import { SolicitacaoEntity } from '../database/entities/solicitacao.entity.js';
import { HistoricoController } from './historico.controller.js';
import { HistoricoService } from './historico.service.js';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([SolicitacaoEntity])],
  controllers: [HistoricoController],
  providers: [HistoricoService],
})
export class HistoricoModule {}
