import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module.js';
import { ProfissionalPerfilEntity } from '../database/entities/profissional-perfil.entity.js';
import { ProfissionalServicoEntity } from '../database/entities/profissional-servico.entity.js';
import { UsuarioEntity } from '../database/entities/usuario.entity.js';
import { ProfissionaisController } from './profissionais.controller.js';
import { ProfissionaisService } from './profissionais.service.js';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      ProfissionalPerfilEntity,
      ProfissionalServicoEntity,
      UsuarioEntity,
    ]),
  ],
  controllers: [ProfissionaisController],
  providers: [ProfissionaisService],
})
export class ProfissionaisModule {}
