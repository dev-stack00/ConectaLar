import 'package:flutter/material.dart';

import '../../app/routes.dart';
import '../../app/theme.dart';
import '../../data/conectalar_mock_store.dart';
import '../../widgets/app_bar_custom.dart';

class PerfilPage extends StatelessWidget {
  const PerfilPage({super.key});

  @override
  Widget build(BuildContext context) {
    final store = ConectaLarMockStore.instance;
    return Scaffold(
      appBar: const AppBarCustom(title: 'Meu perfil'),
      backgroundColor: AppColors.fundo,
      body: AnimatedBuilder(
        animation: store,
        builder: (context, _) {
          final usuario = store.usuarioAtual;
          return ListView(
            padding: const EdgeInsets.fromLTRB(20, 18, 20, 28),
            children: [
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(18),
                  child: Row(
                    children: [
                      CircleAvatar(
                        radius: 34,
                        backgroundColor: AppColors.verdeClaro,
                        foregroundColor: AppColors.verdeEscuro,
                        child: Text(
                          usuario.nome.characters.first.toUpperCase(),
                          style: const TextStyle(
                            fontWeight: FontWeight.w900,
                            fontSize: 24,
                          ),
                        ),
                      ),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              usuario.nome,
                              style: const TextStyle(
                                color: AppColors.texto,
                                fontSize: 20,
                                fontWeight: FontWeight.w900,
                              ),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              usuario.tipo.valorBanco,
                              style: const TextStyle(
                                color: AppColors.textoSuave,
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 14),
              const _DadosProtegidos(),
              const SizedBox(height: 14),
              _PerfilOpcao(
                icon: Icons.badge_outlined,
                title: 'Meus dados',
                subtitle: 'Nome, e-mail e telefone',
                onTap: () =>
                    _mostrarInfo(context, 'Edição completa virá com a API.'),
              ),
              _PerfilOpcao(
                icon: Icons.location_on_outlined,
                title: 'Endereço de atendimento',
                subtitle: 'Oculto até aceite válido do profissional',
                onTap: () => _mostrarInfo(
                  context,
                  'O endereço completo deve ser protegido pelo backend.',
                ),
              ),
              _PerfilOpcao(
                icon: Icons.notifications_outlined,
                title: 'Notificações',
                subtitle: 'Eventos reais do atendimento',
                onTap: () =>
                    _mostrarInfo(context, 'Preferências dependem de P14.'),
              ),
              _PerfilOpcao(
                icon: Icons.lock_outline,
                title: 'Segurança',
                subtitle: 'Sessão, senha e recuperação de acesso',
                onTap: () => Navigator.pushNamed(context, AppRoutes.login),
              ),
              _PerfilOpcao(
                icon: Icons.privacy_tip_outlined,
                title: 'Privacidade',
                subtitle: 'Dados privados e LGPD',
                onTap: () => _mostrarInfo(
                  context,
                  'Dados sensíveis não devem aparecer em logs, links públicos ou telas sem vínculo.',
                ),
              ),
              _PerfilOpcao(
                icon: Icons.logout_rounded,
                title: 'Sair da conta',
                subtitle: 'Encerrar acesso local',
                onTap: () {
                  store.logout();
                  Navigator.pushNamedAndRemoveUntil(
                    context,
                    AppRoutes.login,
                    (_) => false,
                  );
                },
              ),
            ],
          );
        },
      ),
    );
  }

  void _mostrarInfo(BuildContext context, String mensagem) {
    ScaffoldMessenger.of(
      context,
    ).showSnackBar(SnackBar(content: Text(mensagem)));
  }
}

class _DadosProtegidos extends StatelessWidget {
  const _DadosProtegidos();

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppColors.verdeClaro,
        borderRadius: BorderRadius.circular(16),
      ),
      child: const Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(Icons.shield_outlined, color: AppColors.verdeEscuro),
          SizedBox(width: 10),
          Expanded(
            child: Text(
              'Dados protegidos: endereço completo, documentos e conversas só devem ser liberados por autorização no backend.',
              style: TextStyle(
                color: AppColors.texto,
                fontWeight: FontWeight.w700,
                height: 1.35,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _PerfilOpcao extends StatelessWidget {
  const _PerfilOpcao({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.onTap,
  });

  final IconData icon;
  final String title;
  final String subtitle;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        onTap: onTap,
        leading: Icon(icon, color: AppColors.verdeEscuro),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.w800)),
        subtitle: Text(subtitle),
        trailing: const Icon(Icons.chevron_right),
      ),
    );
  }
}
