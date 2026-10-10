import '../models/categoria.dart';
import '../models/home_content.dart';
import '../models/mensagem.dart';
import '../models/profissional.dart';
import '../models/solicitacao.dart';
import '../models/usuario.dart';
import '../data/conectalar_mock_store.dart';

HomeContent homeContentFromApi({
  required Map<String, dynamic> categoriasResponse,
  required Map<String, dynamic> profissionaisResponse,
}) {
  return HomeContent(
    categories: listFromApi(categoriasResponse['categorias'], categoriaFromApi),
    featuredProfessionals: listFromApi(
      profissionaisResponse['profissionais'],
      profissionalFromApi,
    ),
  );
}

Categoria categoriaFromApi(Map<String, dynamic> json) {
  return Categoria(
    id: intValue(json['id']),
    nome: stringValue(json['nome']),
    ativa: boolValue(json['ativo'], fallback: true),
  );
}

Profissional profissionalFromApi(Map<String, dynamic> json) {
  final servicosRaw = json['servicos'];
  final servicos = servicosRaw is List
      ? servicosRaw
            .whereType<Map<String, dynamic>>()
            .map((servico) => stringValue(servico['nome']))
            .where((nome) => nome.isNotEmpty)
            .toList(growable: false)
      : const <String>[];
  final categoriaIds = servicosRaw is List
      ? servicosRaw
            .whereType<Map<String, dynamic>>()
            .map((servico) => intValue(servico['categoria']?['id']))
            .where((id) => id > 0)
            .toSet()
            .toList(growable: false)
      : const <int>[];

  return Profissional(
    id: intValue(json['id']),
    usuarioId: intValue(json['usuarioId']),
    nome: stringValue(json['nome']),
    descricao: stringValue(json['descricao']),
    bairro: stringValue(json['bairro']),
    precoInicial: doubleValueOrNull(json['precoInicial']),
    categoriaIds: categoriaIds,
    verificado: boolValue(json['verificado']),
    servicos: servicos,
  );
}

Solicitacao solicitacaoFromApi(Map<String, dynamic> json) {
  final profissional = json['profissional'];
  final categoria = json['categoria'];

  return Solicitacao(
    id: intValue(json['id']),
    clienteId: intValue(json['cliente']?['id']),
    profissionalId: profissional is Map<String, dynamic>
        ? intValue(profissional['id'])
        : 0,
    categoriaId: categoria is Map<String, dynamic>
        ? intValue(categoria['id'])
        : 0,
    descricao: stringValue(json['descricao']),
    dataServico: dateValue(json['dataServico']),
    horarioServico: stringValue(json['horarioServico']),
    precoInicial: doubleValueOrNull(json['precoInicial']) ?? 0,
    status: statusSolicitacaoFromApi(stringValue(json['status'])),
    criadoEm: dateTimeValue(json['criadoEm']),
    atualizadoEm: dateTimeValue(json['atualizadoEm']),
  );
}

AtendimentoResumo atendimentoResumoFromApi(Map<String, dynamic> json) {
  final profissional = json['profissional'];
  final categoria = json['categoria'];
  return AtendimentoResumo(
    profissional: profissional is Map<String, dynamic>
        ? stringValue(profissional['nome'])
        : 'Profissional',
    categoria: categoria is Map<String, dynamic>
        ? stringValue(categoria['nome'])
        : 'Servico',
    solicitacao: solicitacaoFromApi(json),
    avaliado: boolValue(json['avaliado']),
  );
}

Mensagem mensagemFromApi(Map<String, dynamic> json) {
  final autor = json['autor'];
  return Mensagem(
    id: intValue(json['id']),
    solicitacaoId: intValue(json['solicitacaoId']),
    remetenteId: autor is Map<String, dynamic> ? intValue(autor['id']) : 0,
    conteudo: stringValue(json['conteudo']),
    lida: boolValue(json['lida'], fallback: true),
    criadoEm: dateTimeValue(json['criadoEm']),
  );
}

Usuario usuarioFromApi(Map<String, dynamic> json) {
  return Usuario(
    id: intValue(json['id']),
    nome: stringValue(json['nome']),
    email: stringValue(json['email']),
    tipo: tipoUsuarioFromApi(stringValue(json['tipo'])),
    telefone: nullableString(json['telefone']),
    bairro: nullableString(json['bairroPrincipal'] ?? json['bairro']),
  );
}

StatusSolicitacao statusSolicitacaoFromApi(String value) {
  return StatusSolicitacao.values.firstWhere(
    (status) => status.valorBanco == value,
    orElse: () => StatusSolicitacao.aguardandoResposta,
  );
}

TipoUsuario tipoUsuarioFromApi(String value) {
  return TipoUsuario.values.firstWhere(
    (tipo) => tipo.valorBanco == value,
    orElse: () => TipoUsuario.cliente,
  );
}

List<T> listFromApi<T>(Object? value, T Function(Map<String, dynamic>) mapper) {
  if (value is! List) return const [];
  return value
      .whereType<Map<String, dynamic>>()
      .map(mapper)
      .toList(growable: false);
}

int intValue(Object? value) {
  if (value is int) return value;
  if (value is num) return value.toInt();
  if (value is String) return int.tryParse(value) ?? 0;
  return 0;
}

double? doubleValueOrNull(Object? value) {
  if (value == null) return null;
  if (value is num) return value.toDouble();
  if (value is String) return double.tryParse(value);
  return null;
}

bool boolValue(Object? value, {bool fallback = false}) {
  if (value is bool) return value;
  if (value is num) return value != 0;
  if (value is String) return value == 'true' || value == '1';
  return fallback;
}

String stringValue(Object? value) => value?.toString() ?? '';

String? nullableString(Object? value) {
  final text = stringValue(value).trim();
  return text.isEmpty ? null : text;
}

DateTime dateValue(Object? value) {
  final text = stringValue(value);
  return DateTime.tryParse(text) ?? DateTime.now();
}

DateTime dateTimeValue(Object? value) {
  final text = stringValue(value);
  return DateTime.tryParse(text) ?? DateTime.now();
}
