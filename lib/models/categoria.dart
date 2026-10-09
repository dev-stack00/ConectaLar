class Categoria {
  const Categoria({
    required this.id,
    required this.nome,
    this.descricao,
    this.ativa = true,
  });

  final int id;
  final String nome;
  final String? descricao;
  final bool ativa;
}
