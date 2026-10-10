import 'api_service.dart';

class TermosService {
  const TermosService(this._api);

  final ApiService _api;

  Future<Map<String, dynamic>> atuais() {
    return _api.get('termos/atuais');
  }

  Future<Map<String, dynamic>> meusAceites() {
    return _api.get('termos/aceites/me');
  }

  Future<Map<String, dynamic>> aceitar(String versao) {
    return _api.post('termos/aceites/me', body: {'versao': versao});
  }
}
