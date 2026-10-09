class Mensagem {
  const Mensagem({
    required this.id,
    required this.solicitacaoId,
    required this.remetenteId,
    required this.conteudo,
    required this.lida,
    required this.criadoEm,
  });

  final int id;
  final int solicitacaoId;
  final int remetenteId;
  final String conteudo;
  final bool lida;
  final DateTime criadoEm;
}
