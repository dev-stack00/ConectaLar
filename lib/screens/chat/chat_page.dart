import 'package:flutter/material.dart';

import '../../app/routes.dart';
import '../../app/theme.dart';
import '../../data/conectalar_mock_store.dart';
import '../../models/solicitacao.dart';
import '../../widgets/app_bar_custom.dart';

class ChatPage extends StatelessWidget {
  const ChatPage({super.key});

  @override
  Widget build(BuildContext context) {
    final store = ConectaLarMockStore.instance;
    return Scaffold(
      appBar: const AppBarCustom(title: 'Conversas'),
      backgroundColor: AppColors.fundo,
      body: AnimatedBuilder(
        animation: store,
        builder: (context, _) {
          final conversas = store.servicos
              .where(
                (servico) =>
                    servico.solicitacao.status ==
                        StatusSolicitacao.aguardandoResposta ||
                    servico.solicitacao.status ==
                        StatusSolicitacao.aceitaAgendada,
              )
              .toList(growable: false);

          return ListView(
            padding: const EdgeInsets.fromLTRB(20, 18, 20, 28),
            children: [
              const Text(
                'Chat e negociação',
                style: TextStyle(
                  color: AppColors.texto,
                  fontSize: 22,
                  fontWeight: FontWeight.w900,
                ),
              ),
              const SizedBox(height: 6),
              const Text(
                'Conversas ficam vinculadas a uma solicitação e não confirmam agendamento por si só.',
                style: TextStyle(color: AppColors.textoSuave, height: 1.35),
              ),
              const SizedBox(height: 16),
              if (conversas.isEmpty)
                const _SemConversas()
              else
                for (final conversa in conversas) ...[
                  _ConversaCard(
                    conversa: conversa,
                    onTap: () => Navigator.pushNamed(
                      context,
                      AppRoutes.conversa,
                      arguments: conversa.solicitacao.id,
                    ),
                  ),
                  const SizedBox(height: 12),
                ],
            ],
          );
        },
      ),
    );
  }
}

class _ConversaCard extends StatelessWidget {
  const _ConversaCard({required this.conversa, required this.onTap});

  final AtendimentoResumo conversa;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        key: ValueKey('chat-solicitacao-${conversa.solicitacao.id}'),
        onTap: onTap,
        leading: const CircleAvatar(
          backgroundColor: AppColors.verdeClaro,
          foregroundColor: AppColors.verdeEscuro,
          child: Icon(Icons.chat_bubble_outline),
        ),
        title: Text(
          conversa.profissional,
          style: const TextStyle(fontWeight: FontWeight.w800),
        ),
        subtitle: Text(
          '${conversa.categoria} • ${conversa.solicitacao.status.valorBanco}',
        ),
        trailing: const Icon(Icons.chevron_right),
      ),
    );
  }
}

class _SemConversas extends StatelessWidget {
  const _SemConversas();

  @override
  Widget build(BuildContext context) {
    return const Card(
      child: Padding(
        padding: EdgeInsets.all(20),
        child: Text(
          'Nenhuma conversa ativa no momento.',
          textAlign: TextAlign.center,
          style: TextStyle(
            color: AppColors.textoSuave,
            fontWeight: FontWeight.w700,
          ),
        ),
      ),
    );
  }
}
