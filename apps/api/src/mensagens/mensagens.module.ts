import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module.js';
import { MensagemAtendimentoEntity } from '../database/entities/mensagem-atendimento.entity.js';
import { SolicitacaoEntity } from '../database/entities/solicitacao.entity.js';
import { NotificacoesModule } from '../notificacoes/notificacoes.module.js';
import { MensagensController } from './mensagens.controller.js';
import { MensagensService } from './mensagens.service.js';

@Module({
  imports: [
    AuthModule,
    NotificacoesModule,
    TypeOrmModule.forFeature([MensagemAtendimentoEntity, SolicitacaoEntity]),
  ],
  controllers: [MensagensController],
  providers: [MensagensService],
})
export class MensagensModule {}
