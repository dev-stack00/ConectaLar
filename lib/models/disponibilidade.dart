class Disponibilidade {
  const Disponibilidade({
    required this.id,
    required this.diaSemana,
    required this.horaInicio,
    required this.horaFim,
    this.ativo = true,
  });

  final int id;
  final int diaSemana;
  final String horaInicio;
  final String horaFim;
  final bool ativo;

  Map<String, dynamic> toApi() {
    return {
      'diaSemana': diaSemana,
      'horaInicio': horaInicio,
      'horaFim': horaFim,
      'ativo': ativo,
    };
  }
}
