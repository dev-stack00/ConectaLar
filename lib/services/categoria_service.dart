import 'api_service.dart';

class CategoriaService {
  const CategoriaService(this._api);

  final ApiService _api;

  Future<Map<String, dynamic>> listar() {
    return _api.get('categorias');
  }
}
