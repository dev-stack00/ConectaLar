import 'package:flutter/material.dart';

import '../app/theme.dart';
import '../models/avaliacao.dart';

class AvaliacaoCard extends StatelessWidget {
  const AvaliacaoCard({required this.avaliacao, this.nomeAvaliador, super.key});

  final Avaliacao avaliacao;
  final String? nomeAvaliador;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                const Icon(Icons.star, color: AppColors.estrela),
                const SizedBox(width: 4),
                Text('${avaliacao.nota}/5'),
                if (nomeAvaliador != null) ...[
                  const SizedBox(width: 12),
                  Expanded(child: Text(nomeAvaliador!)),
                ],
              ],
            ),
            if (avaliacao.comentario case final String comentario) ...[
              const SizedBox(height: 8),
              Text(comentario),
            ],
          ],
        ),
      ),
    );
  }
}
