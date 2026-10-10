import 'api_service.dart';

class ClienteService {
  const ClienteService(this._api);

  final ApiService _api;

  Future<Map<String, dynamic>> meuPerfil() {
    return _api.get('clientes/me');
  }

  Future<Map<String, dynamic>> listarFavoritos() {
    return _api.get('clientes/me/favoritos');
  }

  Future<Map<String, dynamic>> adicionarFavorito(int profissionalId) {
    return _api.post('clientes/me/favoritos/$profissionalId');
  }

  Future<Map<String, dynamic>> removerFavorito(int profissionalId) {
    return _api.delete('clientes/me/favoritos/$profissionalId');
  }
}
