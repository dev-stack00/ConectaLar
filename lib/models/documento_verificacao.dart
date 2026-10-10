class DocumentoVerificacao {
  const DocumentoVerificacao({
    required this.id,
    required this.tipoDocumento,
    required this.referenciaArquivo,
    required this.status,
    required this.criadoEm,
    this.nomeArquivo,
    this.observacao,
    this.motivoRejeicao,
    this.analisadoEm,
  });

  final int id;
  final String tipoDocumento;
  final String referenciaArquivo;
  final String? nomeArquivo;
  final String? observacao;
  final String status;
  final String? motivoRejeicao;
  final DateTime? analisadoEm;
  final DateTime criadoEm;
}
