class Avaliacao {
  const Avaliacao({
    required this.id,
    required this.solicitacaoId,
    required this.avaliadorId,
    required this.avaliadoId,
    required this.nota,
    required this.criadoEm,
    this.comentario,
    this.fotoUrl,
  });

  final int id;
  final int solicitacaoId;
  final int avaliadorId;
  final int avaliadoId;
  final int nota;
  final String? comentario;
  final String? fotoUrl;
  final DateTime criadoEm;
}
