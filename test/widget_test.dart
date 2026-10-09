import 'package:conectarlar_app/app/app.dart';
import 'package:conectarlar_app/app/routes.dart';
import 'package:conectarlar_app/models/home_content.dart';
import 'package:conectarlar_app/screens/home/home_page.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('a Home exibe categorias e profissionais mockados', (
    tester,
  ) async {
    await tester.pumpWidget(const ConectaLarApp());
    await tester.pumpAndSettle();

    expect(
      find.text('Encontre profissionais para cuidar do seu lar'),
      findsOneWidget,
    );
    expect(find.text('Categorias'), findsOneWidget);
    expect(find.text('Limpeza'), findsOneWidget);
    expect(find.text('Profissionais em destaque'), findsOneWidget);
    expect(find.text('Carlos Silva'), findsOneWidget);
  });

  testWidgets('a busca da Home abre a rota Buscar', (tester) async {
    await tester.pumpWidget(const ConectaLarApp());
    await tester.pumpAndSettle();

    await tester.tap(find.byKey(const ValueKey('home-search')));
    await tester.pumpAndSettle();

    expect(find.text('Buscar profissionais'), findsOneWidget);
  });

  testWidgets('a navegação inferior abre as telas principais', (tester) async {
    await tester.pumpWidget(const ConectaLarApp());
    await tester.pumpAndSettle();

    const destinations = [
      (Icons.search_outlined, 'Buscar profissionais'),
      (Icons.favorite_border, 'Favoritos'),
      (Icons.calendar_month_outlined, 'Meus serviços'),
      (Icons.person_outline, 'Meu perfil'),
    ];

    for (final (icon, title) in destinations) {
      await tester.tap(find.byIcon(icon));
      await tester.pumpAndSettle();

      expect(find.text(title), findsOneWidget);

      await tester.pageBack();
      await tester.pumpAndSettle();
    }
  });

  testWidgets('a Home cabe em uma tela estreita sem overflow', (tester) async {
    tester.view.devicePixelRatio = 1;
    tester.view.physicalSize = const Size(320, 568);
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);

    await tester.pumpWidget(const ConectaLarApp());
    await tester.pumpAndSettle();

    expect(tester.takeException(), isNull);
  });

  testWidgets('a Home apresenta um estado vazio sem dados', (tester) async {
    await tester.pumpWidget(
      MaterialApp(home: HomePage(loadContent: () async => const HomeContent())),
    );
    await tester.pumpAndSettle();

    expect(find.text('Nenhuma categoria disponível.'), findsOneWidget);
    expect(
      find.text('Nenhum profissional disponível no momento.'),
      findsOneWidget,
    );
  });

  testWidgets('a Home mostra uma mensagem amigável se o carregamento falhar', (
    tester,
  ) async {
    await tester.pumpWidget(
      MaterialApp(
        home: HomePage(
          loadContent: () async => throw Exception('detalhe interno'),
        ),
      ),
    );
    await tester.pumpAndSettle();

    expect(
      find.text('Não foi possível carregar a página inicial. Tente novamente.'),
      findsOneWidget,
    );
    expect(find.text('detalhe interno'), findsNothing);
  });

  testWidgets('todas as rotas registradas abrem uma tela', (tester) async {
    await tester.pumpWidget(const ConectaLarApp());
    final navigator = tester.state<NavigatorState>(find.byType(Navigator));

    for (final route in AppRoutes.routes.keys.where(
      (route) => route != AppRoutes.home,
    )) {
      final navigation = navigator.pushNamed<void>(route);
      await tester.pumpAndSettle();
      expect(find.byType(Scaffold), findsOneWidget, reason: route);
      navigator.pop();
      await tester.pumpAndSettle();
      await navigation;
    }
  });
}
