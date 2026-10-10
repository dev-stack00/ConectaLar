import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsuarioTipo } from '../domain/usuario-tipo.js';
import { RequestWithUser } from './authenticated-user.js';
import { rolesMetadataKey } from './roles.decorator.js';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<UsuarioTipo[]>(
      rolesMetadataKey,
      [context.getHandler(), context.getClass()],
    );
    if (roles === undefined || roles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    if (request.user !== undefined && roles.includes(request.user.tipo)) {
      return true;
    }

    throw new ForbiddenException({
      code: 'ACESSO_NEGADO',
      message: 'Usuario sem permissao para este recurso.',
    });
  }
}
