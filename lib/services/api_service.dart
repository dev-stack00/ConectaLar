import 'dart:convert';

import 'package:http/http.dart' as http;

import '../utils/constants.dart';

class ApiException implements Exception {
  const ApiException(this.message, {this.statusCode});

  final String message;
  final int? statusCode;

  @override
  String toString() => message;
}

class ApiService {
  ApiService({http.Client? client}) : _client = client ?? http.Client();

  final http.Client _client;

  Future<Map<String, dynamic>> get(
    String endpoint, {
    Map<String, String>? queryParameters,
  }) {
    return _request('GET', endpoint, queryParameters: queryParameters);
  }

  Future<Map<String, dynamic>> post(
    String endpoint, {
    Map<String, dynamic>? body,
  }) {
    return _request('POST', endpoint, body: body);
  }

  Future<Map<String, dynamic>> put(
    String endpoint, {
    Map<String, dynamic>? body,
  }) {
    return _request('PUT', endpoint, body: body);
  }

  Future<Map<String, dynamic>> delete(String endpoint) {
    return _request('DELETE', endpoint);
  }

  void close() => _client.close();

  Future<Map<String, dynamic>> _request(
    String method,
    String endpoint, {
    Map<String, String>? queryParameters,
    Map<String, dynamic>? body,
  }) async {
    final uri = _buildUri(endpoint, queryParameters);
    final request = http.Request(method, uri)
      ..headers['Accept'] = 'application/json';
    if (body != null) {
      request.headers['Content-Type'] = 'application/json; charset=utf-8';
      request.body = jsonEncode(body);
    }

    final timeout = Duration(seconds: AppConstants.apiTimeoutSeconds);
    final streamedResponse = await _client.send(request).timeout(timeout);
    final response = await http.Response.fromStream(streamedResponse)
        .timeout(timeout);

    final Object? decoded;
    try {
      decoded = jsonDecode(response.body);
    } on FormatException {
      throw ApiException(
        'A API retornou uma resposta inválida.',
        statusCode: response.statusCode,
      );
    }

    if (decoded is! Map<String, dynamic>) {
      throw ApiException(
        'A API retornou uma resposta inválida.',
        statusCode: response.statusCode,
      );
    }

    if (response.statusCode < 200 ||
        response.statusCode >= 300 ||
        decoded['success'] != true) {
      final message = decoded['message'];
      throw ApiException(
        message is String ? message : 'Não foi possível concluir a requisição.',
        statusCode: response.statusCode,
      );
    }
    return decoded;
  }

  Uri _buildUri(String endpoint, Map<String, String>? queryParameters) {
    final baseUrl = AppConstants.apiBaseUrl.replaceFirst(RegExp(r'/+$'), '');
    final path = endpoint.replaceFirst(RegExp(r'^/+'), '');
    final uri = Uri.parse('$baseUrl/$path');
    return queryParameters == null
        ? uri
        : uri.replace(queryParameters: queryParameters);
  }
}
