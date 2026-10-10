export enum UsuarioTipo {
  Cliente = 'cliente',
  Profissional = 'profissional',
  Empresa = 'empresa',
  Administrador = 'administrador',
}

export const usuarioTiposPublicos = new Set<string>([
  UsuarioTipo.Cliente,
  UsuarioTipo.Profissional,
  UsuarioTipo.Empresa,
]);
