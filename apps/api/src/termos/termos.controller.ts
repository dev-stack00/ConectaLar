import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard.js';
import { AuthenticatedUser } from '../auth/authenticated-user.js';
import { UsuarioAtual } from '../auth/usuario-atual.decorator.js';
import { TermosService } from './termos.service.js';

@Controller('termos')
export class TermosController {
  constructor(private readonly termos: TermosService) {}

  @Get('atuais')
  atuais() {
    return this.termos.atuais();
  }

  @Get('aceites/me')
  @UseGuards(AuthGuard)
  meusAceites(@UsuarioAtual() user: AuthenticatedUser) {
    return this.termos.meusAceites(user);
  }

  @Post('aceites/me')
  @UseGuards(AuthGuard)
  aceitar(@UsuarioAtual() user: AuthenticatedUser, @Body() body: unknown) {
    return this.termos.aceitar(user, body);
  }
}
