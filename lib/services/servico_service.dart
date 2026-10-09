import 'api_service.dart';

class ServicoService {
  const ServicoService(this._api);

  final ApiService _api;

  Future<Map<String, dynamic>> solicitar(Map<String, dynamic> dados) {
    return _api.post('servicos/solicitar.php', body: dados);
  }

  Future<Map<String, dynamic>> aceitar(int solicitacaoId) {
    return _api.post(
      'servicos/aceitar.php',
      body: {'solicitacao_id': solicitacaoId},
    );
  }

  Future<Map<String, dynamic>> recusar(int solicitacaoId) {
    return _api.post(
      'servicos/recusar.php',
      body: {'solicitacao_id': solicitacaoId},
    );
  }

  Future<Map<String, dynamic>> cancelar(int solicitacaoId) {
    return _api.post(
      'servicos/cancelar.php',
      body: {'solicitacao_id': solicitacaoId},
    );
  }

  Future<Map<String, dynamic>> concluir(int solicitacaoId) {
    return _api.post(
      'servicos/concluir.php',
      body: {'solicitacao_id': solicitacaoId},
    );
  }
}
