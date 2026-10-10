import 'api_service.dart';

class AvaliacaoService {
  const AvaliacaoService(this._api);

  final ApiService _api;

  Future<Map<String, dynamic>> listarDaSolicitacao(int solicitacaoId) {
    return _api.get('solicitacoes/$solicitacaoId/avaliacoes');
  }

  Future<Map<String, dynamic>> avaliarProfissional({
    required int solicitacaoId,
    required int nota,
    String? comentario,
  }) {
    return _api.post(
      'solicitacoes/$solicitacaoId/avaliacoes/profissional',
      body: {'nota': nota, 'comentario': ?comentario},
    );
  }

  Future<Map<String, dynamic>> avaliarCliente({
    required int solicitacaoId,
    required int nota,
    String? comentario,
  }) {
    return _api.post(
      'solicitacoes/$solicitacaoId/avaliacoes/cliente',
      body: {'nota': nota, 'comentario': ?comentario},
    );
  }
}
