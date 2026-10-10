import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard.js';
import { AuthenticatedUser } from '../auth/authenticated-user.js';
import { UsuarioAtual } from '../auth/usuario-atual.decorator.js';
import { MensagensService } from './mensagens.service.js';

@Controller('solicitacoes/:solicitacaoId/mensagens')
@UseGuards(AuthGuard)
export class MensagensController {
  constructor(private readonly mensagens: MensagensService) {}

  @Get()
  listar(
    @UsuarioAtual() user: AuthenticatedUser,
    @Param('solicitacaoId') solicitacaoId: string,
  ) {
    return this.mensagens.listar(user, parseId(solicitacaoId));
  }

  @Post()
  enviar(
    @UsuarioAtual() user: AuthenticatedUser,
    @Param('solicitacaoId') solicitacaoId: string,
    @Body() body: unknown,
  ) {
    return this.mensagens.enviar(user, parseId(solicitacaoId), body);
  }
}

function parseId(value: string): number {
  if (!/^[1-9]\d{0,9}$/.test(value)) {
    return 0;
  }

  return Number(value);
}
