import 'package:flutter/material.dart';

import 'app_bar_custom.dart';

class PageScaffold extends StatelessWidget {
  const PageScaffold({
    required this.title,
    this.message = 'Esta tela está preparada para as próximas etapas.',
    super.key,
  });

  final String title;
  final String message;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBarCustom(title: title),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Text(
            message,
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.bodyLarge,
          ),
        ),
      ),
    );
  }
}
