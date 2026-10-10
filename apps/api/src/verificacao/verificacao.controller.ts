import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard.js';
import { AuthenticatedUser } from '../auth/authenticated-user.js';
import { Roles } from '../auth/roles.decorator.js';
import { RolesGuard } from '../auth/roles.guard.js';
import { UsuarioAtual } from '../auth/usuario-atual.decorator.js';
import { UsuarioTipo } from '../domain/usuario-tipo.js';
import { VerificacaoService } from './verificacao.service.js';

@Controller()
export class VerificacaoController {
  constructor(private readonly verificacao: VerificacaoService) {}

  @Post('profissionais/me/documentos')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsuarioTipo.Profissional, UsuarioTipo.Empresa)
  enviarMeuDocumento(
    @UsuarioAtual() user: AuthenticatedUser,
    @Body() body: unknown,
  ) {
    return this.verificacao.enviarMeuDocumento(user, body);
  }

  @Get('profissionais/me/documentos')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsuarioTipo.Profissional, UsuarioTipo.Empresa)
  listarMeusDocumentos(@UsuarioAtual() user: AuthenticatedUser) {
    return this.verificacao.listarMeusDocumentos(user);
  }

  @Get('documentos-verificacao')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsuarioTipo.Administrador)
  listarParaAnalise(@Query() query: Record<string, unknown>) {
    return this.verificacao.listarParaAnalise(query);
  }

  @Patch('documentos-verificacao/:id/analisar')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsuarioTipo.Administrador)
  analisarDocumento(
    @UsuarioAtual() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() body: unknown,
  ) {
    return this.verificacao.analisarDocumento(user, parseId(id), body);
  }
}

function parseId(value: string): number {
  if (!/^[1-9]\d{0,9}$/.test(value)) {
    return 0;
  }

  return Number(value);
}
