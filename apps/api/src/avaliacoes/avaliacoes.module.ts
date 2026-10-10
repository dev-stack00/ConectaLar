import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module.js';
import { AvaliacaoEntity } from '../database/entities/avaliacao.entity.js';
import { SolicitacaoEntity } from '../database/entities/solicitacao.entity.js';
import { AvaliacoesController } from './avaliacoes.controller.js';
import { AvaliacoesService } from './avaliacoes.service.js';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([AvaliacaoEntity, SolicitacaoEntity]),
  ],
  controllers: [AvaliacoesController],
  providers: [AvaliacoesService],
})
export class AvaliacoesModule {}
