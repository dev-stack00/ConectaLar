String? validarCampoObrigatorio(String? valor) {
  if (valor == null || valor.trim().isEmpty) {
    return 'Este campo é obrigatório.';
  }
  return null;
}

String? validarEmail(String? valor) {
  final erroObrigatorio = validarCampoObrigatorio(valor);
  if (erroObrigatorio != null) return erroObrigatorio;

  final email = valor!.trim();
  if (!RegExp(r'^[^\s@]+@[^\s@]+\.[^\s@]+$').hasMatch(email)) {
    return 'Informe um e-mail válido.';
  }
  return null;
}

String? validarSenha(String? valor) {
  final erroObrigatorio = validarCampoObrigatorio(valor);
  if (erroObrigatorio != null) return erroObrigatorio;
  if (valor!.length < 8) return 'A senha deve ter pelo menos 8 caracteres.';
  return null;
}
