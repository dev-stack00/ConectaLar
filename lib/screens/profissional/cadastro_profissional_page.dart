import 'package:flutter/material.dart';

import '../../app/routes.dart';
import '../../app/theme.dart';
import '../../data/conectalar_mock_store.dart';
import '../../models/solicitacao.dart';
import '../../utils/validators.dart';
import '../../widgets/app_bar_custom.dart';

class CadastroProfissionalPage extends StatefulWidget {
  const CadastroProfissionalPage({super.key});

  @override
  State<CadastroProfissionalPage> createState() =>
      _CadastroProfissionalPageState();
}

class _CadastroProfissionalPageState extends State<CadastroProfissionalPage> {
  final _formKey = GlobalKey<FormState>();
  final _descricaoController = TextEditingController();
  final _bairroController = TextEditingController(text: 'Jardim das Flores');
  final _precoController = TextEditingController(text: '80');
  bool _empresa = false;
  bool _documentosEnviados = false;

  @override
  void dispose() {
    _descricaoController.dispose();
    _bairroController.dispose();
    _precoController.dispose();
    super.dispose();
  }

  void _continuar() {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _documentosEnviados = true);
  }

  @override
  Widget build(BuildContext context) {
    final store = ConectaLarMockStore.instance;
    return Scaffold(
      appBar: const AppBarCustom(title: 'Cadastro profissional'),
      backgroundColor: AppColors.fundo,
      body: AnimatedBuilder(
        animation: store,
        builder: (context, _) {
          final pendentes = store.servicos
              .where(
                (servico) =>
                    servico.solicitacao.status ==
                    StatusSolicitacao.aguardandoResposta,
              )
              .toList(growable: false);

          return ListView(
            padding: const EdgeInsets.fromLTRB(20, 18, 20, 32),
            children: [
              const Text(
                'Profissional/Empresa',
                style: TextStyle(
                  color: AppColors.texto,
                  fontSize: 24,
                  fontWeight: FontWeight.w900,
                ),
              ),
              const SizedBox(height: 6),
              const Text(
                'Passo 1 de 4: dados de atuação, serviços e documentação.',
                style: TextStyle(color: AppColors.textoSuave),
              ),
              const SizedBox(height: 16),
              _FormularioProfissional(
                formKey: _formKey,
                descricaoController: _descricaoController,
                bairroController: _bairroController,
                precoController: _precoController,
                empresa: _empresa,
                documentosEnviados: _documentosEnviados,
                onEmpresaChanged: (value) => setState(() => _empresa = value),
                onContinuar: _continuar,
              ),
              const SizedBox(height: 18),
              const Text(
                'Solicitações recebidas',
                style: TextStyle(
                  color: AppColors.texto,
                  fontSize: 18,
                  fontWeight: FontWeight.w900,
                ),
              ),
              const SizedBox(height: 10),
              if (pendentes.isEmpty)
                const Card(
                  child: Padding(
                    padding: EdgeInsets.all(16),
                    child: Text('Nenhuma solicitação aguardando resposta.'),
                  ),
                )
              else
                for (final atendimento in pendentes) ...[
                  _PedidoRecebidoCard(atendimento: atendimento, store: store),
                  const SizedBox(height: 12),
                ],
            ],
          );
        },
      ),
    );
  }
}

class _FormularioProfissional extends StatelessWidget {
  const _FormularioProfissional({
    required this.formKey,
    required this.descricaoController,
    required this.bairroController,
    required this.precoController,
    required this.empresa,
    required this.documentosEnviados,
    required this.onEmpresaChanged,
    required this.onContinuar,
  });

  final GlobalKey<FormState> formKey;
  final TextEditingController descricaoController;
  final TextEditingController bairroController;
  final TextEditingController precoController;
  final bool empresa;
  final bool documentosEnviados;
  final ValueChanged<bool> onEmpresaChanged;
  final VoidCallback onContinuar;

  @override
  Widget build(BuildContext context) {
    return Form(
      key: formKey,
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(18),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SwitchListTile(
                contentPadding: EdgeInsets.zero,
                value: empresa,
                onChanged: onEmpresaChanged,
                title: const Text('Atuar como empresa'),
                subtitle: const Text('Vínculos e integrantes dependem de P12.'),
              ),
              const SizedBox(height: 8),
              TextFormField(
                controller: descricaoController,
                decoration: const InputDecoration(
                  labelText: 'Descrição profissional',
                  hintText: 'Ex.: eletricista residencial',
                  border: OutlineInputBorder(),
                ),
                validator: validarCampoObrigatorio,
              ),
              const SizedBox(height: 12),
              TextFormField(
                controller: bairroController,
                decoration: const InputDecoration(
                  labelText: 'Bairro/região de atuação',
                  border: OutlineInputBorder(),
                ),
                validator: validarCampoObrigatorio,
              ),
              const SizedBox(height: 12),
              TextFormField(
                controller: precoController,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(
                  labelText: 'Preço inicial',
                  prefixText: 'R\$ ',
                  border: OutlineInputBorder(),
                ),
                validator: validarCampoObrigatorio,
              ),
              const SizedBox(height: 12),
              const _DocumentoAviso(),
              const SizedBox(height: 14),
              SizedBox(
                width: double.infinity,
                child: FilledButton.icon(
                  key: const ValueKey('profissional-continuar'),
                  onPressed: onContinuar,
                  icon: Icon(
                    documentosEnviados
                        ? Icons.verified_user_outlined
                        : Icons.upload_file_outlined,
                  ),
                  label: Text(
                    documentosEnviados
                        ? 'Documentação enviada para análise'
                        : 'Continuar',
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _DocumentoAviso extends StatelessWidget {
  const _DocumentoAviso();

  @override
  Widget build(BuildContext context) {
    return const Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Icon(Icons.privacy_tip_outlined, color: AppColors.verdeEscuro),
        SizedBox(width: 8),
        Expanded(
          child: Text(
            'Documentos ficam restritos à administração. O selo só aparece após aprovação e não garante resultado.',
            style: TextStyle(color: AppColors.textoSuave, height: 1.35),
          ),
        ),
      ],
    );
  }
}

class _PedidoRecebidoCard extends StatelessWidget {
  const _PedidoRecebidoCard({required this.atendimento, required this.store});

  final AtendimentoResumo atendimento;
  final ConectaLarMockStore store;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              atendimento.categoria,
              style: const TextStyle(
                color: AppColors.textoSuave,
                fontWeight: FontWeight.w700,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              atendimento.solicitacao.descricao,
              style: const TextStyle(
                color: AppColors.texto,
                fontWeight: FontWeight.w800,
              ),
            ),
            const SizedBox(height: 12),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                FilledButton.icon(
                  key: ValueKey(
                    'profissional-aceitar-${atendimento.solicitacao.id}',
                  ),
                  onPressed: () {
                    store.aceitarSolicitacaoComoProfissional(
                      atendimento.solicitacao.id,
                    );
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Solicitação aceita.')),
                    );
                  },
                  icon: const Icon(Icons.check_rounded),
                  label: const Text('Aceitar'),
                ),
                OutlinedButton.icon(
                  onPressed: () {
                    store.recusarSolicitacaoComoProfissional(
                      atendimento.solicitacao.id,
                    );
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Solicitação recusada.')),
                    );
                  },
                  icon: const Icon(Icons.close_rounded),
                  label: const Text('Recusar'),
                ),
                TextButton.icon(
                  onPressed: () => Navigator.pushNamed(
                    context,
                    AppRoutes.conversa,
                    arguments: atendimento.solicitacao.id,
                  ),
                  icon: const Icon(Icons.chat_bubble_outline),
                  label: const Text('Conversar'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
