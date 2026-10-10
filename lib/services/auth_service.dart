import 'api_service.dart';

class AuthService {
  AuthService(this._api);

  final ApiService _api;
  Map<String, dynamic>? _usuarioAtual;

  Map<String, dynamic>? get usuarioAtual => _usuarioAtual;
  bool get autenticado => _api.autenticado;

  Future<Map<String, dynamic>> login({
    required String email,
    required String senha,
  }) async {
    final response = await _api.post(
      'auth/login',
      body: {'email': email, 'senha': senha},
    );
    _registrarSessao(response);
    return response;
  }

  Future<Map<String, dynamic>> cadastrar({
    required String nome,
    required String email,
    required String senha,
    required String tipo,
    String? telefone,
  }) async {
    final response = await _api.post(
      'auth/cadastro',
      body: {
        'nome': nome,
        'email': email,
        'senha': senha,
        'tipo': tipo,
        if (telefone != null && telefone.isNotEmpty) 'telefone': telefone,
      },
    );
    _registrarSessao(response);
    return response;
  }

  Future<Map<String, dynamic>> solicitarRecuperacaoSenha({
    required String email,
  }) {
    return _api.post('auth/senha/recuperacao', body: {'email': email});
  }

  Future<Map<String, dynamic>> confirmarRecuperacaoSenha({
    required String token,
    required String novaSenha,
  }) {
    return _api.post(
      'auth/senha/recuperacao/confirmar',
      body: {'token': token, 'novaSenha': novaSenha},
    );
  }

  Future<Map<String, dynamic>> alterarSenha({
    required String senhaAtual,
    required String novaSenha,
  }) {
    return _api.patch(
      'auth/senha',
      body: {'senhaAtual': senhaAtual, 'novaSenha': novaSenha},
    );
  }

  Future<Map<String, dynamic>> logout() async {
    _usuarioAtual = null;
    _api.definirToken(null);
    return {'ok': true};
  }

  void _registrarSessao(Map<String, dynamic> response) {
    final token = response['token'];
    final usuario = response['usuario'];
    if (token is Map<String, dynamic>) {
      final accessToken = token['accessToken'];
      if (accessToken is String) {
        _api.definirToken(accessToken);
      }
    }
    if (usuario is Map<String, dynamic>) {
      _usuarioAtual = usuario;
    }
  }
}
