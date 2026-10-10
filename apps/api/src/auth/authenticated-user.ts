import { UsuarioTipo } from '../domain/usuario-tipo.js';

export interface AuthenticatedUser {
  readonly id: number;
  readonly tipo: UsuarioTipo;
}

export interface RequestWithUser {
  readonly headers: Record<string, string | string[] | undefined>;
  user?: AuthenticatedUser;
}
