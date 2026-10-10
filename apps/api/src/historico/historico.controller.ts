import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard.js';
import { AuthenticatedUser } from '../auth/authenticated-user.js';
import { Roles } from '../auth/roles.decorator.js';
import { RolesGuard } from '../auth/roles.guard.js';
import { UsuarioAtual } from '../auth/usuario-atual.decorator.js';
import { UsuarioTipo } from '../domain/usuario-tipo.js';
import { HistoricoService } from './historico.service.js';

@Controller()
export class HistoricoController {
  constructor(private readonly historico: HistoricoService) {}

  @Get('historico/atendimentos/me')
  @UseGuards(AuthGuard)
  meusAtendimentos(
    @UsuarioAtual() user: AuthenticatedUser,
    @Query() query: Record<string, unknown>,
  ) {
    return this.historico.meusAtendimentos(user, query);
  }

  @Get('admin/historico/atendimentos')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsuarioTipo.Administrador)
  listarAdmin(@Query() query: Record<string, unknown>) {
    return this.historico.listarAdmin(query);
  }
}
