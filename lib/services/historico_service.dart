import 'api_service.dart';

class HistoricoService {
  const HistoricoService(this._api);

  final ApiService _api;

  Future<Map<String, dynamic>> meusAtendimentos({
    bool? finalizados,
    String? status,
  }) {
    return _api.get(
      'historico/atendimentos/me',
      queryParameters: {
        if (finalizados != null) 'finalizados': '$finalizados',
        if (status != null && status.isNotEmpty) 'status': status,
      },
    );
  }
}
