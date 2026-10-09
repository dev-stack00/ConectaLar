import 'api_service.dart';

class AuthService {
  const AuthService(this._api);

  final ApiService _api;

  Future<Map<String, dynamic>> login({
    required String email,
    required String senha,
  }) {
    return _api.post(
      'auth/login.php',
      body: {'email': email, 'senha': senha},
    );
  }

  Future<Map<String, dynamic>> cadastrar({
    required String nome,
    required String email,
    required String senha,
    required String tipo,
  }) {
    return _api.post(
      'auth/cadastro.php',
      body: {'nome': nome, 'email': email, 'senha': senha, 'tipo': tipo},
    );
  }

  Future<Map<String, dynamic>> logout() {
    return _api.post('auth/logout.php');
  }
}
