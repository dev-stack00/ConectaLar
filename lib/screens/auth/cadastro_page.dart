import 'package:flutter/material.dart';

import '../../app/routes.dart';
import '../../app/theme.dart';
import '../../data/conectalar_mock_store.dart';
import '../../models/usuario.dart';
import '../../utils/validators.dart';
import '../../widgets/app_bar_custom.dart';

class CadastroPage extends StatefulWidget {
  const CadastroPage({super.key});

  @override
  State<CadastroPage> createState() => _CadastroPageState();
}

class _CadastroPageState extends State<CadastroPage> {
  final _formKey = GlobalKey<FormState>();
  final _nomeController = TextEditingController();
  final _emailController = TextEditingController();
  final _telefoneController = TextEditingController();
  final _senhaController = TextEditingController();
  final _confirmarSenhaController = TextEditingController();
  TipoUsuario _tipo = TipoUsuario.cliente;
  bool _aceitouTermos = false;

  @override
  void dispose() {
    _nomeController.dispose();
    _emailController.dispose();
    _telefoneController.dispose();
    _senhaController.dispose();
    _confirmarSenhaController.dispose();
    super.dispose();
  }

  void _criarConta() {
    if (!_formKey.currentState!.validate() || !_aceitouTermos) {
      setState(() {});
      return;
    }

    ConectaLarMockStore.instance.registrarConta(
      nome: _nomeController.text,
      email: _emailController.text,
      telefone: _telefoneController.text,
      tipo: _tipo,
    );

    if (_tipo == TipoUsuario.cliente) {
      Navigator.pushNamedAndRemoveUntil(context, AppRoutes.home, (_) => false);
    } else {
      Navigator.pushReplacementNamed(context, AppRoutes.cadastroProfissional);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const AppBarCustom(title: 'Criar conta'),
      backgroundColor: AppColors.fundo,
      body: SafeArea(
        top: false,
        child: ListView(
          padding: const EdgeInsets.fromLTRB(20, 18, 20, 32),
          children: [
            const Text(
              'Crie sua conta',
              style: TextStyle(
                color: AppColors.texto,
                fontSize: 26,
                fontWeight: FontWeight.w900,
              ),
            ),
            const SizedBox(height: 6),
            const Text(
              'Passo 1 de 3: dados básicos e tipo de conta.',
              style: TextStyle(color: AppColors.textoSuave),
            ),
            const SizedBox(height: 16),
            Form(
              key: _formKey,
              child: Card(
                child: Padding(
                  padding: const EdgeInsets.all(18),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      SegmentedButton<TipoUsuario>(
                        key: const ValueKey('cadastro-tipo-conta'),
                        segments: const [
                          ButtonSegment(
                            value: TipoUsuario.cliente,
                            icon: Icon(Icons.person_outline),
                            label: Text('Cliente'),
                          ),
                          ButtonSegment(
                            value: TipoUsuario.profissional,
                            icon: Icon(Icons.home_repair_service_outlined),
                            label: Text('Profissional'),
                          ),
                        ],
                        selected: {_tipo},
                        onSelectionChanged: (value) =>
                            setState(() => _tipo = value.first),
                      ),
                      const SizedBox(height: 16),
                      TextFormField(
                        key: const ValueKey('cadastro-nome'),
                        controller: _nomeController,
                        decoration: const InputDecoration(
                          labelText: 'Nome completo',
                        ),
                        textInputAction: TextInputAction.next,
                        validator: validarCampoObrigatorio,
                      ),
                      const SizedBox(height: 12),
                      TextFormField(
                        key: const ValueKey('cadastro-email'),
                        controller: _emailController,
                        decoration: const InputDecoration(labelText: 'E-mail'),
                        keyboardType: TextInputType.emailAddress,
                        textInputAction: TextInputAction.next,
                        validator: validarEmail,
                      ),
                      const SizedBox(height: 12),
                      TextFormField(
                        key: const ValueKey('cadastro-telefone'),
                        controller: _telefoneController,
                        decoration: const InputDecoration(
                          labelText: 'Telefone',
                        ),
                        keyboardType: TextInputType.phone,
                        textInputAction: TextInputAction.next,
                        validator: validarCampoObrigatorio,
                      ),
                      const SizedBox(height: 12),
                      TextFormField(
                        key: const ValueKey('cadastro-senha'),
                        controller: _senhaController,
                        obscureText: true,
                        decoration: const InputDecoration(labelText: 'Senha'),
                        validator: validarSenha,
                      ),
                      const SizedBox(height: 12),
                      TextFormField(
                        key: const ValueKey('cadastro-confirmar-senha'),
                        controller: _confirmarSenhaController,
                        obscureText: true,
                        decoration: const InputDecoration(
                          labelText: 'Confirmar senha',
                        ),
                        validator: (valor) {
                          final erro = validarSenha(valor);
                          if (erro != null) return erro;
                          if (valor != _senhaController.text) {
                            return 'As senhas devem ser iguais.';
                          }
                          return null;
                        },
                      ),
                      const SizedBox(height: 10),
                      CheckboxListTile(
                        key: const ValueKey('cadastro-termos'),
                        contentPadding: EdgeInsets.zero,
                        value: _aceitouTermos,
                        onChanged: (value) =>
                            setState(() => _aceitouTermos = value ?? false),
                        controlAffinity: ListTileControlAffinity.leading,
                        title: const Text(
                          'Li e aceito os termos e o aviso de privacidade.',
                        ),
                        subtitle: !_aceitouTermos
                            ? const Text('Obrigatório para continuar.')
                            : null,
                      ),
                      const SizedBox(height: 12),
                      SizedBox(
                        width: double.infinity,
                        child: FilledButton.icon(
                          key: const ValueKey('cadastro-criar-conta'),
                          onPressed: _criarConta,
                          icon: const Icon(Icons.person_add_alt_1),
                          label: const Text('Criar conta'),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
