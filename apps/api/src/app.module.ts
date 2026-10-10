import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module.js';
import { AvaliacoesModule } from './avaliacoes/avaliacoes.module.js';
import { CategoriasModule } from './categorias/categorias.module.js';
import { ClientesModule } from './clientes/clientes.module.js';
import {
  databaseRuntimeOptions,
  isAuthRuntimeConfigured,
} from './database/database.config.js';
import { DisponibilidadeModule } from './disponibilidade/disponibilidade.module.js';
import { MensagensModule } from './mensagens/mensagens.module.js';
import { NotificacoesModule } from './notificacoes/notificacoes.module.js';
import { HealthController } from './health/health.controller.js';
import { ProfissionaisModule } from './profissionais/profissionais.module.js';
import { SolicitacoesModule } from './solicitacoes/solicitacoes.module.js';
import { VerificacaoModule } from './verificacao/verificacao.module.js';

const runtimeImports = isAuthRuntimeConfigured()
  ? [
      TypeOrmModule.forRoot(databaseRuntimeOptions()),
      AuthModule,
      CategoriasModule,
      ProfissionaisModule,
      SolicitacoesModule,
      MensagensModule,
      AvaliacoesModule,
      ClientesModule,
      DisponibilidadeModule,
      NotificacoesModule,
      VerificacaoModule,
    ]
  : [];

@Module({
  imports: runtimeImports,
  controllers: [HealthController],
})
export class AppModule {}
