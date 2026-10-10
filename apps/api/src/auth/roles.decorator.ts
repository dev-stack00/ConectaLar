import { SetMetadata } from '@nestjs/common';
import { UsuarioTipo } from '../domain/usuario-tipo.js';

export const rolesMetadataKey = 'conectalar:roles';

export function Roles(...roles: UsuarioTipo[]) {
  return SetMetadata(rolesMetadataKey, roles);
}
