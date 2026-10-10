import 'package:flutter/material.dart';

import '../../app/routes.dart';
import '../../app/theme.dart';
import '../../data/conectalar_mock_store.dart';
import '../../models/profissional.dart';
import '../../widgets/app_bar_custom.dart';
import '../../widgets/profissional_card.dart';

class FavoritosPage extends StatelessWidget {
  const FavoritosPage({super.key});

  @override
  Widget build(BuildContext context) {
    final store = ConectaLarMockStore.instance;
    return Scaffold(
      appBar: const AppBarCustom(title: 'Meus favoritos'),
      backgroundColor: AppColors.fundo,
      body: AnimatedBuilder(
        animation: store,
        builder: (context, _) {
          final favoritos = store.profissionaisFavoritos;
          return ListView(
            padding: const EdgeInsets.fromLTRB(20, 18, 20, 28),
            children: [
              const Text(
                'Profissionais e serviços salvos',
                style: TextStyle(
                  color: AppColors.texto,
                  fontSize: 22,
                  fontWeight: FontWeight.w900,
                ),
              ),
              const SizedBox(height: 6),
              const Text(
                'Os serviços favoritos aparecem como referência visual; o escopo atual salva perfis profissionais.',
                style: TextStyle(color: AppColors.textoSuave, height: 1.35),
              ),
              const SizedBox(height: 16),
              const Row(
                children: [
                  ChoiceChip(label: Text('Profissionais'), selected: true),
                  SizedBox(width: 8),
                  ChoiceChip(label: Text('Serviços'), selected: false),
                ],
              ),
              const SizedBox(height: 16),
              if (favoritos.isEmpty)
                const _FavoritosVazios()
              else
                for (final profissional in favoritos) ...[
                  _FavoritoItem(profissional: profissional, store: store),
                  const SizedBox(height: 12),
                ],
            ],
          );
        },
      ),
    );
  }
}

class _FavoritoItem extends StatelessWidget {
  const _FavoritoItem({required this.profissional, required this.store});

  final Profissional profissional;
  final ConectaLarMockStore store;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        ProfissionalCard(
          profissional: profissional,
          onTap: () => Navigator.pushNamed(
            context,
            AppRoutes.perfilProfissional,
            arguments: profissional,
          ),
        ),
        Positioned(
          right: 8,
          top: 8,
          child: IconButton.filledTonal(
            key: ValueKey('favorito-remover-${profissional.id}'),
            tooltip: 'Remover dos favoritos',
            onPressed: () => store.toggleFavorito(profissional.id),
            icon: const Icon(Icons.favorite, color: Color(0xFFC53030)),
          ),
        ),
      ],
    );
  }
}

class _FavoritosVazios extends StatelessWidget {
  const _FavoritosVazios();

  @override
  Widget build(BuildContext context) {
    return const Card(
      child: Padding(
        padding: EdgeInsets.all(20),
        child: Column(
          children: [
            Icon(Icons.favorite_border, color: AppColors.verdeEscuro, size: 36),
            SizedBox(height: 10),
            Text(
              'Nenhum profissional favorito ainda.',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: AppColors.texto,
                fontWeight: FontWeight.w800,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
