class Profissional {
  const Profissional({
    required this.id,
    required this.usuarioId,
    required this.nome,
    required this.descricao,
    required this.bairro,
    this.precoInicial,
    this.categoriaIds = const [],
    this.verificado = false,
    this.fotoAsset,
    this.notaMedia,
    this.quantidadeAvaliacoes,
    this.servicos = const [],
  });

  final int id;
  final int usuarioId;
  final String nome;
  final String descricao;
  final String bairro;
  final double? precoInicial;
  final List<int> categoriaIds;
  final String? fotoAsset;
  final double? notaMedia;
  final int? quantidadeAvaliacoes;
  final List<String> servicos;

  // Este valor é uma projeção da API baseada em documentos aprovados.
  final bool verificado;
}
