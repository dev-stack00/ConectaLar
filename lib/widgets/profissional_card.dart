import 'package:flutter/material.dart';

import '../models/profissional.dart';

class ProfissionalCard extends StatelessWidget {
  const ProfissionalCard({required this.profissional, this.onTap, super.key});

  final Profissional profissional;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final preco = profissional.precoInicial;
    return Card(
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              CircleAvatar(
                backgroundColor: Theme.of(context).colorScheme.primaryContainer,
                foregroundColor: Theme.of(context).colorScheme.primary,
                child: Text(
                  profissional.nome.isEmpty
                      ? '?'
                      : profissional.nome.characters.first.toUpperCase(),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: Text(
                            profissional.nome,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: Theme.of(context).textTheme.titleSmall,
                          ),
                        ),
                        if (profissional.verificado) ...[
                          const SizedBox(width: 4),
                          const Icon(
                            Icons.verified,
                            size: 18,
                            semanticLabel: 'Profissional verificado',
                          ),
                        ],
                      ],
                    ),
                    const SizedBox(height: 4),
                    Text(
                      profissional.descricao,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                    const SizedBox(height: 8),
                    Wrap(
                      spacing: 4,
                      crossAxisAlignment: WrapCrossAlignment.center,
                      children: [
                        const Icon(Icons.location_on_outlined, size: 16),
                        Text(profissional.bairro),
                      ],
                    ),
                    const SizedBox(height: 4),
                    Text(
                      preco == null
                          ? 'Preço sob consulta'
                          : 'A partir de R\$ ${preco.toStringAsFixed(2).replaceAll('.', ',')}',
                      style: Theme.of(context).textTheme.labelLarge,
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
