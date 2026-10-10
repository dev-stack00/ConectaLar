import 'package:flutter/material.dart';

import '../models/profissional.dart';

class ProfissionalCard extends StatelessWidget {
  const ProfissionalCard({
    required this.profissional,
    this.onTap,
    this.trailingAction,
    super.key,
  });

  final Profissional profissional;
  final VoidCallback? onTap;
  final Widget? trailingAction;

  @override
  Widget build(BuildContext context) {
    final preco = profissional.precoInicial;
    final foto = profissional.fotoAsset;
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
                radius: 28,
                backgroundColor: Theme.of(context).colorScheme.primaryContainer,
                foregroundColor: Theme.of(context).colorScheme.primary,
                child: foto == null
                    ? Text(
                        profissional.nome.isEmpty
                            ? '?'
                            : profissional.nome.characters.first.toUpperCase(),
                      )
                    : ClipOval(
                        child: Image.asset(
                          foto,
                          width: 56,
                          height: 56,
                          fit: BoxFit.cover,
                          errorBuilder: (_, _, _) => const Icon(
                            Icons.person_outline_rounded,
                            size: 28,
                          ),
                        ),
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
                            style: const TextStyle(
                              color: Color(0xFF153B31),
                              fontSize: 15,
                              fontWeight: FontWeight.w800,
                            ),
                          ),
                        ),
                        if (profissional.verificado) ...[
                          const SizedBox(width: 6),
                          Tooltip(
                            message: 'Verificação documental administrativa',
                            child: Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 7,
                                vertical: 4,
                              ),
                              decoration: BoxDecoration(
                                color: const Color(0xFFE8F3ED),
                                borderRadius: BorderRadius.circular(20),
                              ),
                              child: const Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Icon(
                                    Icons.verified_rounded,
                                    color: Color(0xFF237A57),
                                    size: 14,
                                  ),
                                  SizedBox(width: 3),
                                  Text(
                                    'Verificado',
                                    style: TextStyle(
                                      color: Color(0xFF15553B),
                                      fontSize: 10,
                                      fontWeight: FontWeight.w700,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ],
                    ),
                    const SizedBox(height: 5),
                    Row(
                      children: [
                        const Icon(
                          Icons.star_rounded,
                          color: Color(0xFFFFC107),
                          size: 17,
                        ),
                        const SizedBox(width: 3),
                        Text(
                          profissional.notaMedia == null
                              ? 'Novo profissional'
                              : '${profissional.notaMedia!.toStringAsFixed(1).replaceAll('.', ',')} · ${profissional.quantidadeAvaliacoes ?? 0} avaliações',
                          style: const TextStyle(
                            color: Color(0xFF7D8985),
                            fontSize: 11,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 5),
                    Text(
                      profissional.descricao,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                    const SizedBox(height: 5),
                    Wrap(
                      spacing: 4,
                      crossAxisAlignment: WrapCrossAlignment.center,
                      children: [
                        const Icon(
                          Icons.location_on_outlined,
                          size: 15,
                          color: Color(0xFF7D8985),
                        ),
                        Text(
                          profissional.bairro,
                          style: const TextStyle(
                            color: Color(0xFF7D8985),
                            fontSize: 11,
                          ),
                        ),
                      ],
                    ),
                    if (profissional.servicos.isNotEmpty) ...[
                      const SizedBox(height: 7),
                      Wrap(
                        spacing: 5,
                        runSpacing: 5,
                        children: [
                          for (final servico in profissional.servicos.take(3))
                            Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 8,
                                vertical: 4,
                              ),
                              decoration: BoxDecoration(
                                color: const Color(0xFFF1F6F3),
                                borderRadius: BorderRadius.circular(20),
                              ),
                              child: Text(
                                'Serviço: $servico',
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                                style: const TextStyle(
                                  color: Color(0xFF426257),
                                  fontSize: 10,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ),
                        ],
                      ),
                    ],
                    const SizedBox(height: 8),
                    Text(
                      preco == null
                          ? 'Preço sob consulta'
                          : 'A partir de R\$ ${preco.toStringAsFixed(2).replaceAll('.', ',')}',
                      style: const TextStyle(
                        color: Color(0xFF168354),
                        fontSize: 13,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    Align(
                      alignment: Alignment.centerRight,
                      child: TextButton.icon(
                        onPressed: onTap,
                        style: TextButton.styleFrom(
                          foregroundColor: const Color(0xFF237A57),
                          padding: const EdgeInsets.symmetric(
                            horizontal: 8,
                            vertical: 2,
                          ),
                          minimumSize: const Size(0, 32),
                          tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                        ),
                        iconAlignment: IconAlignment.end,
                        icon: const Icon(Icons.arrow_forward_rounded, size: 16),
                        label: const Text(
                          'Ver perfil',
                          style: TextStyle(fontWeight: FontWeight.w700),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              if (trailingAction != null) ...[
                const SizedBox(width: 4),
                trailingAction!,
              ],
            ],
          ),
        ),
      ),
    );
  }
}
