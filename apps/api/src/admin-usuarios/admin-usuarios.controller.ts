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
import { AdminUsuariosService } from './admin-usuarios.service.js';

@Controller('admin/usuarios')
@UseGuards(AuthGuard, RolesGuard)
@Roles(UsuarioTipo.Administrador)
export class AdminUsuariosController {
  constructor(private readonly usuarios: AdminUsuariosService) {}

  @Get()
  listar(@Query() query: Record<string, unknown>) {
    return this.usuarios.listar(query);
  }

  @Get(':id')
  obter(@Param('id') id: string) {
    return this.usuarios.obter(parseId(id));
  }

  @Post('administradores')
  criarAdministrador(
    @UsuarioAtual() user: AuthenticatedUser,
    @Body() body: unknown,
  ) {
    return this.usuarios.criarAdministrador(user, body);
  }

  @Patch(':id/status')
  atualizarStatus(
    @UsuarioAtual() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() body: unknown,
  ) {
    return this.usuarios.atualizarStatus(user, parseId(id), body);
  }
}

function parseId(value: string): number {
  if (!/^[1-9]\d{0,9}$/.test(value)) {
    return 0;
  }

  return Number(value);
}
