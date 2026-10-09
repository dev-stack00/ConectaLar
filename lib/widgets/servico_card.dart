import 'package:flutter/material.dart';

import '../models/solicitacao.dart';

class ServicoCard extends StatelessWidget {
  const ServicoCard({required this.solicitacao, this.onTap, super.key});

  final Solicitacao solicitacao;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final data = solicitacao.dataServico;
    final dataFormatada =
        '${data.day.toString().padLeft(2, '0')}/'
        '${data.month.toString().padLeft(2, '0')}/${data.year}';
    return Card(
      child: ListTile(
        onTap: onTap,
        leading: const Icon(Icons.home_repair_service_outlined),
        title: Text('Solicitação #${solicitacao.id}'),
        subtitle: Text('$dataFormatada às ${solicitacao.horarioServico}'),
        trailing: Text(solicitacao.status.valorBanco),
      ),
    );
  }
}
