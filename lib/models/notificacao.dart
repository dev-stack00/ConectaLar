class Notificacao {
  const Notificacao({
    required this.id,
    required this.tipo,
    required this.titulo,
    required this.mensagem,
    required this.lida,
    required this.criadoEm,
    this.recursoTipo,
    this.recursoId,
    this.lidaEm,
  });

  final int id;
  final String tipo;
  final String titulo;
  final String mensagem;
  final String? recursoTipo;
  final int? recursoId;
  final bool lida;
  final DateTime? lidaEm;
  final DateTime criadoEm;
}
