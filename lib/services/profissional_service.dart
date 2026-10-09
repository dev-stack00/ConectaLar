import 'api_service.dart';

class ProfissionalService {
  const ProfissionalService(this._api);

  final ApiService _api;

  Future<Map<String, dynamic>> listar() {
    return _api.get('profissionais/listar.php');
  }

  Future<Map<String, dynamic>> buscar({
    String? termo,
    String? categoriaId,
    String? bairro,
  }) {
    final filtros = <String, String>{
      if (termo != null && termo.isNotEmpty) 'termo': termo,
      if (bairro != null && bairro.isNotEmpty) 'bairro': bairro,
    };
    if (categoriaId != null) {
      filtros['categoria_id'] = categoriaId;
    }
    return _api.get('profissionais/buscar.php', queryParameters: filtros);
  }

  Future<Map<String, dynamic>> cadastrar(Map<String, dynamic> dados) {
    return _api.post('profissionais/cadastrar.php', body: dados);
  }
}
