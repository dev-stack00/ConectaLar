import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedUser, RequestWithUser } from './authenticated-user.js';

export const UsuarioAtual = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthenticatedUser => {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    if (request.user === undefined) {
      throw new Error('Authenticated user was not attached to the request.');
    }

    return request.user;
  },
);
