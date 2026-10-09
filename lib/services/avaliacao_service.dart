import 'api_service.dart';

class AvaliacaoService {
  const AvaliacaoService(this._api);

  final ApiService _api;

  Future<Map<String, dynamic>> listar({int? profissionalId}) {
    return _api.get(
      'avaliacoes/listar.php',
      queryParameters: profissionalId == null
          ? null
          : {'profissional_id': '$profissionalId'},
    );
  }

  Future<Map<String, dynamic>> cadastrar(Map<String, dynamic> dados) {
    return _api.post('avaliacoes/cadastrar.php', body: dados);
  }
}
