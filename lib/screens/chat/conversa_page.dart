import 'package:flutter/material.dart';

import '../../app/routes.dart';
import '../../app/theme.dart';
import '../../data/conectalar_mock_store.dart';
import '../../models/mensagem.dart';
import '../../models/solicitacao.dart';
import '../../widgets/app_bar_custom.dart';

class ConversaPage extends StatefulWidget {
  const ConversaPage({super.key});

  @override
  State<ConversaPage> createState() => _ConversaPageState();
}

class _ConversaPageState extends State<ConversaPage> {
  final _controller = TextEditingController();

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  int? _solicitacaoId(BuildContext context) {
    final arguments = ModalRoute.of(context)?.settings.arguments;
    if (arguments is int) return arguments;
    if (arguments is Solicitacao) return arguments.id;
    return null;
  }

  void _enviar(int solicitacaoId) {
    ConectaLarMockStore.instance.enviarMensagem(
      solicitacaoId: solicitacaoId,
      conteudo: _controller.text,
    );
    _controller.clear();
  }

  @override
  Widget build(BuildContext context) {
    final store = ConectaLarMockStore.instance;
    final solicitacaoId = _solicitacaoId(context);

    return Scaffold(
      appBar: const AppBarCustom(title: 'Conversa'),
      backgroundColor: AppColors.fundo,
      body: AnimatedBuilder(
        animation: store,
        builder: (context, _) {
          final atendimento = solicitacaoId == null
              ? null
              : store.atendimentoPorId(solicitacaoId);
          if (atendimento == null) return const _ConversaIndisponivel();

          final mensagens = store.mensagensDaSolicitacao(solicitacaoId!);
          return Column(
            children: [
              _ContextoServico(atendimento: atendimento),
              Expanded(
                child: ListView(
                  padding: const EdgeInsets.fromLTRB(20, 12, 20, 12),
                  children: [
                    for (final mensagem in mensagens)
                      _MensagemBolha(
                        mensagem: mensagem,
                        enviadaPorMim:
                            mensagem.remetenteId == store.usuarioAtual.id,
                      ),
                    if (atendimento.solicitacao.status ==
                        StatusSolicitacao.aceitaAgendada)
                      _PropostaAgendada(atendimento: atendimento),
                  ],
                ),
              ),
              _CampoMensagem(
                controller: _controller,
                onEnviar: () => _enviar(solicitacaoId),
              ),
            ],
          );
        },
      ),
    );
  }
}

class _ContextoServico extends StatelessWidget {
  const _ContextoServico({required this.atendimento});

  final AtendimentoResumo atendimento;

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      padding: const EdgeInsets.fromLTRB(20, 12, 20, 14),
      child: Row(
        children: [
          const CircleAvatar(
            backgroundColor: AppColors.verdeClaro,
            foregroundColor: AppColors.verdeEscuro,
            child: Icon(Icons.home_repair_service_outlined),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  atendimento.profissional,
                  style: const TextStyle(
                    color: AppColors.texto,
                    fontWeight: FontWeight.w900,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  '${atendimento.categoria} • ${atendimento.solicitacao.status.valorBanco}',
                  style: const TextStyle(color: AppColors.textoSuave),
                ),
              ],
            ),
          ),
          IconButton(
            tooltip: 'Ver detalhes',
            onPressed: () => Navigator.pushNamed(
              context,
              AppRoutes.detalhesServico,
              arguments: atendimento.solicitacao.id,
            ),
            icon: const Icon(Icons.info_outline),
          ),
        ],
      ),
    );
  }
}

class _MensagemBolha extends StatelessWidget {
  const _MensagemBolha({required this.mensagem, required this.enviadaPorMim});

  final Mensagem mensagem;
  final bool enviadaPorMim;

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: enviadaPorMim ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        constraints: const BoxConstraints(maxWidth: 300),
        margin: const EdgeInsets.only(bottom: 10),
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
        decoration: BoxDecoration(
          color: enviadaPorMim ? AppColors.verde : Colors.white,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Text(
          mensagem.conteudo,
          style: TextStyle(
            color: enviadaPorMim ? Colors.white : AppColors.texto,
            height: 1.35,
          ),
        ),
      ),
    );
  }
}

class _PropostaAgendada extends StatelessWidget {
  const _PropostaAgendada({required this.atendimento});

  final AtendimentoResumo atendimento;

  @override
  Widget build(BuildContext context) {
    final data = atendimento.solicitacao.dataServico;
    final dataFormatada =
        '${data.day.toString().padLeft(2, '0')}/'
        '${data.month.toString().padLeft(2, '0')}/${data.year}';
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Agendamento registrado',
              style: TextStyle(
                color: AppColors.texto,
                fontWeight: FontWeight.w900,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              '$dataFormatada às ${atendimento.solicitacao.horarioServico}',
              style: const TextStyle(color: AppColors.textoSuave),
            ),
            const SizedBox(height: 10),
            const Text(
              'A conversa ajuda a alinhar detalhes, mas não muda o status do atendimento.',
              style: TextStyle(color: AppColors.textoSuave, height: 1.35),
            ),
          ],
        ),
      ),
    );
  }
}

class _CampoMensagem extends StatelessWidget {
  const _CampoMensagem({required this.controller, required this.onEnviar});

  final TextEditingController controller;
  final VoidCallback onEnviar;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      top: false,
      child: Container(
        color: Colors.white,
        padding: const EdgeInsets.fromLTRB(12, 10, 12, 10),
        child: Row(
          children: [
            Expanded(
              child: TextField(
                key: const ValueKey('chat-mensagem'),
                controller: controller,
                decoration: const InputDecoration(
                  hintText: 'Digite sua mensagem',
                  border: OutlineInputBorder(),
                ),
                minLines: 1,
                maxLines: 4,
              ),
            ),
            const SizedBox(width: 8),
            IconButton.filled(
              key: const ValueKey('chat-enviar'),
              tooltip: 'Enviar',
              onPressed: onEnviar,
              icon: const Icon(Icons.send_rounded),
            ),
          ],
        ),
      ),
    );
  }
}

class _ConversaIndisponivel extends StatelessWidget {
  const _ConversaIndisponivel();

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Padding(
        padding: EdgeInsets.all(24),
        child: Text(
          'Conversa indisponível. Selecione uma solicitação autorizada.',
          textAlign: TextAlign.center,
        ),
      ),
    );
  }
}
