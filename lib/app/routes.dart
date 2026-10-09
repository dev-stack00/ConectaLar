import 'package:flutter/material.dart';

import '../screens/auth/cadastro_page.dart';
import '../screens/auth/login_page.dart';
import '../screens/busca/busca_page.dart';
import '../screens/busca/resultado_page.dart';
import '../screens/chat/chat_page.dart';
import '../screens/chat/conversa_page.dart';
import '../screens/favoritos/favoritos_page.dart';
import '../screens/home/home_page.dart';
import '../screens/perfil/perfil_page.dart';
import '../screens/profissional/cadastro_profissional_page.dart';
import '../screens/profissional/perfil_profissional_page.dart';
import '../screens/servicos/detalhes_servico_page.dart';
import '../screens/servicos/meus_servicos_page.dart';
import '../screens/servicos/solicitar_servico_page.dart';

abstract final class AppRoutes {
  static const home = '/';
  static const login = '/login';
  static const cadastro = '/cadastro';
  static const busca = '/busca';
  static const resultados = '/busca/resultados';
  static const perfilProfissional = '/profissionais/perfil';
  static const cadastroProfissional = '/profissionais/cadastro';
  static const meusServicos = '/servicos';
  static const solicitarServico = '/servicos/solicitar';
  static const detalhesServico = '/servicos/detalhes';
  static const favoritos = '/favoritos';
  static const chat = '/chat';
  static const conversa = '/chat/conversa';
  static const perfil = '/perfil';

  static final Map<String, WidgetBuilder> routes = {
    home: (_) => const HomePage(),
    login: (_) => const LoginPage(),
    cadastro: (_) => const CadastroPage(),
    busca: (_) => const BuscaPage(),
    resultados: (_) => const ResultadoPage(),
    perfilProfissional: (_) => const PerfilProfissionalPage(),
    cadastroProfissional: (_) => const CadastroProfissionalPage(),
    meusServicos: (_) => const MeusServicosPage(),
    solicitarServico: (_) => const SolicitarServicoPage(),
    detalhesServico: (_) => const DetalhesServicoPage(),
    favoritos: (_) => const FavoritosPage(),
    chat: (_) => const ChatPage(),
    conversa: (_) => const ConversaPage(),
    perfil: (_) => const PerfilPage(),
  };
}
