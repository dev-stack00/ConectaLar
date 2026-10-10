import 'api_service.dart';

class NotificacaoService {
  const NotificacaoService(this._api);

  final ApiService _api;

  Future<Map<String, dynamic>> listar({bool apenasNaoLidas = false}) {
    return _api.get(
      'notificacoes/me',
      queryParameters: apenasNaoLidas ? {'naoLidas': 'true'} : null,
    );
  }

  Future<Map<String, dynamic>> resumo() {
    return _api.get('notificacoes/me/resumo');
  }

  Future<Map<String, dynamic>> marcarComoLida(int id) {
    return _api.patch('notificacoes/$id/lida');
  }

  Future<Map<String, dynamic>> marcarTodasComoLidas() {
    return _api.patch('notificacoes/me/lidas');
  }
}
