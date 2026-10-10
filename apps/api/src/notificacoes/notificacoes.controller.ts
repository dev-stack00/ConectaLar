import { Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard.js';
import { AuthenticatedUser } from '../auth/authenticated-user.js';
import { UsuarioAtual } from '../auth/usuario-atual.decorator.js';
import { NotificacoesService } from './notificacoes.service.js';

@Controller('notificacoes')
@UseGuards(AuthGuard)
export class NotificacoesController {
  constructor(private readonly notificacoes: NotificacoesService) {}

  @Get('me')
  listarMinhas(
    @UsuarioAtual() user: AuthenticatedUser,
    @Query() query: Record<string, unknown>,
  ) {
    return this.notificacoes.listarMinhas(user, query);
  }

  @Get('me/resumo')
  resumoMinhas(@UsuarioAtual() user: AuthenticatedUser) {
    return this.notificacoes.resumoMinhas(user);
  }

  @Patch('me/lidas')
  marcarTodasComoLidas(@UsuarioAtual() user: AuthenticatedUser) {
    return this.notificacoes.marcarTodasComoLidas(user);
  }

  @Patch(':id/lida')
  marcarComoLida(
    @UsuarioAtual() user: AuthenticatedUser,
    @Param('id') id: string,
  ) {
    return this.notificacoes.marcarComoLida(user, parseId(id));
  }
}

function parseId(value: string): number {
  if (!/^[1-9]\d{0,9}$/.test(value)) {
    return 0;
  }

  return Number(value);
}
